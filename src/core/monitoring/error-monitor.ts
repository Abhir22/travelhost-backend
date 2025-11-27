import chokidar from 'chokidar';
import * as ts from 'typescript';
import * as path from 'path';
import * as fs from 'fs';
import logger from '../utils/logger';

interface CompilationError {
  file: string;
  line: number;
  column: number;
  message: string;
  code: number;
  category: 'error' | 'warning' | 'suggestion' | 'message';
  severity: 'high' | 'medium' | 'low';
}

interface ModuleHealth {
  moduleName: string;
  totalFiles: number;
  filesWithErrors: number;
  totalErrors: number;
  totalWarnings: number;
  lastChecked: Date;
  errors: CompilationError[];
}

export class ErrorMonitor {
  private watcher: chokidar.FSWatcher | null = null;
  private program: ts.Program | null = null;
  private configPath: string;
  private watchedPaths: string[];
  private moduleHealth: Map<string, ModuleHealth> = new Map();
  private checkInterval: NodeJS.Timeout | null = null;
  private autoFix: boolean;

  constructor(
    watchPaths: string[] = ['src'],
    autoFix: boolean = true,
    checkIntervalMs: number = 5000
  ) {
    this.configPath = path.resolve(process.cwd(), 'tsconfig.json');
    this.watchedPaths = watchPaths.map(p => path.resolve(process.cwd(), p));
    this.autoFix = autoFix;
  }

  /**
   * Start monitoring
   */
  public start(): void {
    logger.info('🔍 Starting Error Monitor...');
    
    // Initialize TypeScript program
    this.initializeTypeScriptProgram();

    // Setup file watcher
    this.watcher = chokidar.watch(this.watchedPaths, {
      ignored: /(^|[\/\\])\../,
      persistent: true,
      ignoreInitial: false,
      awaitWriteFinish: {
        stabilityThreshold: 500,
        pollInterval: 100
      }
    });

    this.watcher
      .on('add', (filePath: string) => this.handleFileChange(filePath))
      .on('change', (filePath: string) => this.handleFileChange(filePath))
      .on('unlink', (filePath: string) => this.handleFileDelete(filePath))
      .on('error', (error: any) => logger.error(`Watcher error: ${error}`))
      .on('ready', () => {
        logger.info('✅ Error Monitor is ready');
        logger.info(`📂 Watching: ${this.watchedPaths.join(', ')}`);
        
        // Initial scan of all TypeScript files
        this.performInitialScan();
        
        // Initial health check
        this.performHealthCheck();
      });

    // Periodic health check
    this.checkInterval = setInterval(() => {
      this.performHealthCheck();
    }, 30000); // Every 30 seconds
  }

  /**
   * Stop monitoring
   */
  public async stop(): Promise<void> {
    if (this.watcher) {
      await this.watcher.close();
    }
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
    logger.info('🛑 Error Monitor stopped');
  }

  /**
   * Initialize TypeScript program
   */
  private initializeTypeScriptProgram(): void {
    try {
      const configFile = ts.readConfigFile(this.configPath, ts.sys.readFile);
      if (configFile.error) {
        logger.error('Error reading tsconfig.json:', configFile.error);
        return;
      }

      const parsedConfig = ts.parseJsonConfigFileContent(
        configFile.config,
        ts.sys,
        path.dirname(this.configPath)
      );

      const host = ts.createCompilerHost(parsedConfig.options);
      this.program = ts.createProgram({
        rootNames: parsedConfig.fileNames,
        options: parsedConfig.options,
        host
      });

      logger.info('✅ TypeScript program initialized for error monitoring');
    } catch (error) {
      logger.error('Failed to initialize TypeScript program:', error);
    }
  }

  /**
   * Handle file changes
   */
  private async handleFileChange(filePath: string): Promise<void> {
    if (!filePath.endsWith('.ts') && !filePath.endsWith('.tsx')) {
      return;
    }

    // Reinitialize program to pick up changes
    this.initializeTypeScriptProgram();

    // Check the specific file
    await this.checkFile(filePath);
  }

  /**
   * Handle file deletion
   */
  private handleFileDelete(filePath: string): void {
    const moduleName = this.extractModuleName(filePath);
    if (moduleName) {
      const health = this.moduleHealth.get(moduleName);
      if (health) {
        health.totalFiles = Math.max(0, health.totalFiles - 1);
        this.moduleHealth.set(moduleName, health);
      }
    }
  }

  /**
   * Check a specific file for errors
   */
  private async checkFile(filePath: string): Promise<void> {
    if (!this.program) {
      return;
    }

    const sourceFile = this.program.getSourceFile(filePath);
    if (!sourceFile) {
      return;
    }

    const syntacticDiagnostics = this.program.getSyntacticDiagnostics(sourceFile);
    const semanticDiagnostics = this.program.getSemanticDiagnostics(sourceFile);
    const allDiagnostics = [...syntacticDiagnostics, ...semanticDiagnostics];

    const errors = this.convertDiagnosticsToErrors(allDiagnostics, sourceFile);
    
    // Update module health
    const moduleName = this.extractModuleName(filePath);
    if (moduleName) {
      this.updateModuleHealth(moduleName, filePath, errors);
    }

    // Log errors if any
    if (errors.length > 0) {
      logger.warn(`⚠️ Found ${errors.length} issue(s) in ${path.basename(filePath)}`);
      errors.forEach(error => {
        const icon = error.category === 'error' ? '❌' : error.category === 'warning' ? '⚠️' : 'ℹ️';
        logger.error(`  ${icon} Line ${error.line}:${error.column} - ${error.message}`);
      });

      // Try to auto-fix common errors if enabled
      if (this.autoFix) {
        await this.attemptAutoFix(filePath, errors, sourceFile);
      }
    }
  }

  /**
   * Attempt to auto-fix common errors
   */
  private async attemptAutoFix(filePath: string, errors: CompilationError[], sourceFile: ts.SourceFile): Promise<void> {
    const fixableErrors = errors.filter(error => this.isAutoFixable(error));
    
    if (fixableErrors.length === 0) {
      return;
    }

    logger.info(`🔧 Attempting to auto-fix ${fixableErrors.length} error(s) in ${path.basename(filePath)}`);

    let content = fs.readFileSync(filePath, 'utf-8');
    let hasChanges = false;

    for (const error of fixableErrors) {
      const fix = await this.generateAutoFix(error, filePath, content);
      if (fix) {
        content = fix.newContent;
        hasChanges = true;
        logger.info(`✅ Fixed: ${error.message.substring(0, 60)}...`);
      }
    }

    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf-8');
      logger.info(`💾 Auto-fixes applied to ${path.basename(filePath)}`);
      
      // Reinitialize program to pick up changes
      setTimeout(() => {
        this.initializeTypeScriptProgram();
      }, 1000);
    }
  }

  /**
   * Check if an error is auto-fixable
   */
  private isAutoFixable(error: CompilationError): boolean {
    const autoFixablePatterns = [
      /Cannot find name ['"](.+?)['"]/,
      /Cannot find module ['"](.+?)['"]/,
      /Module .* has no exported member ['"](.+?)['"]/,
      /Property ['"](.+?)['"] does not exist/,
      /Parameter .* implicitly has an 'any' type/,
      /Variable .* implicitly has an 'any' type/,
      /Type .* is not assignable to type/,
    ];

    return autoFixablePatterns.some(pattern => pattern.test(error.message));
  }

  /**
   * Generate auto-fix for an error
   */
  private async generateAutoFix(
    error: CompilationError, 
    filePath: string, 
    content: string
  ): Promise<{ newContent: string; description: string } | null> {
    const lines = content.split('\n');

    // Handle "Cannot find name" errors
    const nameMatch = error.message.match(/Cannot find name ['"](.+?)['"]/);
    if (nameMatch) {
      const missingSymbol = nameMatch[1];
      const importSuggestion = await this.findSymbolInProject(missingSymbol, filePath);
      
      if (importSuggestion) {
        // Check if import already exists
        const importExists = lines.some(line => 
          line.includes(`import`) && line.includes(missingSymbol) && line.includes(importSuggestion.modulePath)
        );

        if (!importExists) {
          // Find the best place to insert the import
          const insertIndex = this.findImportInsertionPoint(lines);
          lines.splice(insertIndex, 0, importSuggestion.importStatement);
          
          return {
            newContent: lines.join('\n'),
            description: `Added import for ${missingSymbol}`
          };
        }
      }
    }

    // Handle "Cannot find module" errors
    const moduleMatch = error.message.match(/Cannot find module ['"](.+?)['"]/);
    if (moduleMatch) {
      const missingModule = moduleMatch[1];
      
      // Try to fix common path issues
      const fixedPath = this.suggestModulePath(missingModule, filePath);
      if (fixedPath && fixedPath !== missingModule) {
        const newContent = content.replace(
          new RegExp(`['"]${missingModule.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`, 'g'),
          `'${fixedPath}'`
        );
        
        return {
          newContent,
          description: `Fixed module path from ${missingModule} to ${fixedPath}`
        };
      }
    }

    // Handle "implicitly has 'any' type" errors
    const implicitAnyMatch = error.message.match(/Parameter ['"](.+?)['"] implicitly has an 'any' type/);
    if (implicitAnyMatch) {
      const paramName = implicitAnyMatch[1];
      const lineIndex = error.line - 1;
      
      if (lineIndex >= 0 && lineIndex < lines.length) {
        const line = lines[lineIndex];
        
        // Try to infer type based on common patterns
        let suggestedType = 'any';
        
        // Common parameter patterns
        if (paramName === 'm' && line.includes('.filter') && line.includes('.map')) {
          suggestedType = 'any'; // Could be a module object
        } else if (paramName.includes('req') || paramName.includes('request')) {
          suggestedType = 'Request';
        } else if (paramName.includes('res') || paramName.includes('response')) {
          suggestedType = 'Response';
        } else if (paramName.includes('next')) {
          suggestedType = 'NextFunction';
        } else if (line.includes('filter') || line.includes('map') || line.includes('forEach')) {
          suggestedType = 'any'; // Array callback parameter
        }
        
        // Replace parameter with typed version
        const paramPattern = new RegExp(`\\b${paramName}\\b(?=\\s*[,)])`, 'g');
        const newLine = line.replace(paramPattern, `${paramName}: ${suggestedType}`);
        
        if (newLine !== line) {
          lines[lineIndex] = newLine;
          return {
            newContent: lines.join('\n'),
            description: `Added type annotation for parameter '${paramName}'`
          };
        }
      }
    }

    return null;
  }

  /**
   * Find a symbol in the project and suggest import
   */
  private async findSymbolInProject(
    symbolName: string,
    currentFilePath: string
  ): Promise<{ importStatement: string; modulePath: string } | null> {
    const projectRoot = process.cwd();
    const searchDirs = [
      'src/types', 
      'src/core', 
      'src/modules', 
      'src/loaders', 
      'src/utils',
      'src/middlewares',
      'src/services',
      'src/controllers',
      'src/repositories',
      'src'  // Also search root src directory
    ];

    for (const dir of searchDirs) {
      const searchPath = path.join(projectRoot, dir);
      if (!fs.existsSync(searchPath)) continue;

      const result = await this.searchSymbolInDirectory(searchPath, symbolName, currentFilePath);
      if (result) return result;
    }

    return null;
  }

  /**
   * Search for a symbol in a directory recursively
   */
  private async searchSymbolInDirectory(
    dirPath: string,
    symbolName: string,
    currentFilePath: string
  ): Promise<{ importStatement: string; modulePath: string } | null> {
    try {
      const files = fs.readdirSync(dirPath);

      for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          const result = await this.searchSymbolInDirectory(filePath, symbolName, currentFilePath);
          if (result) return result;
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
          const content = fs.readFileSync(filePath, 'utf-8');
          
          // Check for various export patterns
          const exportPatterns = [
            new RegExp(`export\\s+default\\s+${symbolName}\\b`),
            new RegExp(`export\\s+class\\s+${symbolName}\\b`),
            new RegExp(`export\\s+interface\\s+${symbolName}\\b`),
            new RegExp(`export\\s+type\\s+${symbolName}\\b`),
            new RegExp(`export\\s+const\\s+${symbolName}\\b`),
            new RegExp(`export\\s+function\\s+${symbolName}\\b`),
            new RegExp(`export\\s+{[^}]*\\b${symbolName}\\b[^}]*}`),
            new RegExp(`const\\s+${symbolName}\\s*=.*export\\s+default\\s+${symbolName}`),
          ];

          const hasDefaultExport = /export\s+default\s+/.test(content) && content.includes(symbolName);
          const hasNamedExport = exportPatterns.some(pattern => pattern.test(content));

          if (hasDefaultExport || hasNamedExport) {
            const importPath = this.generateImportPath(filePath, currentFilePath);
            
            if (hasDefaultExport) {
              return {
                importStatement: `import ${symbolName} from '${importPath}';`,
                modulePath: importPath
              };
            } else {
              return {
                importStatement: `import { ${symbolName} } from '${importPath}';`,
                modulePath: importPath
              };
            }
          }
        }
      }
    } catch (error) {
      // Ignore errors and continue searching
    }

    return null;
  }

  /**
   * Generate import path (prefer @ alias)
   */
  private generateImportPath(targetFile: string, currentFile: string): string {
    const projectRoot = process.cwd();
    const relativePath = path.relative(projectRoot, targetFile);
    
    // Use @ alias if file is in src/
    if (relativePath.startsWith('src' + path.sep)) {
      return '@/' + relativePath.substring(4).replace(/\\/g, '/').replace(/\.tsx?$/, '');
    }

    // Otherwise use relative path
    const relPath = path.relative(path.dirname(currentFile), targetFile);
    return relPath.replace(/\\/g, '/').replace(/\.tsx?$/, '');
  }

  /**
   * Find the best place to insert an import statement
   */
  private findImportInsertionPoint(lines: string[]): number {
    let lastImportIndex = -1;
    let firstNonCommentIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip empty lines and comments at the top
      if (line === '' || line.startsWith('//') || line.startsWith('/*') || line.startsWith('*')) {
        if (lastImportIndex === -1) {
          firstNonCommentIndex = i + 1;
        }
        continue;
      }

      // Track import statements
      if (line.startsWith('import ')) {
        lastImportIndex = i;
      } else if (lastImportIndex >= 0) {
        // We've found imports and now hit a non-import line
        break;
      }
    }

    // Insert after the last import, or at the beginning after comments
    return lastImportIndex >= 0 ? lastImportIndex + 1 : firstNonCommentIndex;
  }

  /**
   * Suggest a corrected module path
   */
  private suggestModulePath(originalPath: string, currentFilePath: string): string | null {
    // Common path corrections
    const corrections = [
      // Fix relative path issues
      { from: /^([^@])/, to: './$1' },
      // Fix @ alias issues
      { from: /^@\/src\//, to: '@/' },
      // Fix extension issues
      { from: /\.ts$/, to: '' },
      { from: /\.tsx$/, to: '' },
    ];

    for (const correction of corrections) {
      const corrected = originalPath.replace(correction.from, correction.to);
      if (corrected !== originalPath) {
        // Check if the corrected path exists
        const resolvedPath = this.resolveModulePath(corrected, currentFilePath);
        if (resolvedPath && fs.existsSync(resolvedPath)) {
          return corrected;
        }
      }
    }

    return null;
  }

  /**
   * Resolve a module path to an actual file path
   */
  private resolveModulePath(modulePath: string, currentFilePath: string): string | null {
    try {
      if (modulePath.startsWith('@/')) {
        // Handle @ alias
        const projectRoot = process.cwd();
        const srcPath = path.join(projectRoot, 'src', modulePath.substring(2));
        
        // Try with different extensions
        for (const ext of ['.ts', '.tsx', '.js', '.jsx']) {
          const fullPath = srcPath + ext;
          if (fs.existsSync(fullPath)) {
            return fullPath;
          }
        }
        
        // Try as directory with index file
        for (const ext of ['.ts', '.tsx', '.js', '.jsx']) {
          const indexPath = path.join(srcPath, 'index' + ext);
          if (fs.existsSync(indexPath)) {
            return indexPath;
          }
        }
      } else if (modulePath.startsWith('./') || modulePath.startsWith('../')) {
        // Handle relative paths
        const basePath = path.resolve(path.dirname(currentFilePath), modulePath);
        
        // Try with different extensions
        for (const ext of ['.ts', '.tsx', '.js', '.jsx']) {
          const fullPath = basePath + ext;
          if (fs.existsSync(fullPath)) {
            return fullPath;
          }
        }
      }
    } catch (error) {
      // Ignore errors
    }

    return null;
  }

  /**
   * Convert TypeScript diagnostics to our error format
   */
  private convertDiagnosticsToErrors(
    diagnostics: ts.Diagnostic[],
    sourceFile: ts.SourceFile
  ): CompilationError[] {
    return diagnostics.map(diagnostic => {
      const { line, character } = sourceFile.getLineAndCharacterOfPosition(diagnostic.start || 0);
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      
      let category: 'error' | 'warning' | 'suggestion' | 'message';
      let severity: 'high' | 'medium' | 'low';

      switch (diagnostic.category) {
        case ts.DiagnosticCategory.Error:
          category = 'error';
          severity = 'high';
          break;
        case ts.DiagnosticCategory.Warning:
          category = 'warning';
          severity = 'medium';
          break;
        case ts.DiagnosticCategory.Suggestion:
          category = 'suggestion';
          severity = 'low';
          break;
        default:
          category = 'message';
          severity = 'low';
      }

      return {
        file: sourceFile.fileName,
        line: line + 1,
        column: character + 1,
        message,
        code: diagnostic.code,
        category,
        severity
      };
    });
  }

  /**
   * Extract module name from file path
   */
  private extractModuleName(filePath: string): string | null {
    const normalized = filePath.replace(/\\/g, '/');
    const match = normalized.match(/\/modules\/([^\/]+)\//);
    return match ? match[1] : null;
  }

  /**
   * Update module health information
   */
  private updateModuleHealth(moduleName: string, filePath: string, errors: CompilationError[]): void {
    let health = this.moduleHealth.get(moduleName);
    
    if (!health) {
      health = {
        moduleName,
        totalFiles: 0,
        filesWithErrors: 0,
        totalErrors: 0,
        totalWarnings: 0,
        lastChecked: new Date(),
        errors: []
      };
    }

    // Remove old errors for this file
    health.errors = health.errors.filter(e => e.file !== filePath);

    // Add new errors
    health.errors.push(...errors);

    // Update counts
    health.totalErrors = health.errors.filter(e => e.category === 'error').length;
    health.totalWarnings = health.errors.filter(e => e.category === 'warning').length;
    health.filesWithErrors = new Set(health.errors.map(e => e.file)).size;
    health.lastChecked = new Date();

    this.moduleHealth.set(moduleName, health);
  }

  /**
   * Perform health check on all modules
   */
  private performHealthCheck(): void {
    if (this.moduleHealth.size === 0) {
      return;
    }

    console.log('\n' + '='.repeat(80));
    console.log('📊 MODULE HEALTH REPORT');
    console.log('='.repeat(80));

    let totalErrors = 0;
    let totalWarnings = 0;
    let healthyModules = 0;

    this.moduleHealth.forEach((health, moduleName) => {
      totalErrors += health.totalErrors;
      totalWarnings += health.totalWarnings;

      if (health.totalErrors === 0 && health.totalWarnings === 0) {
        healthyModules++;
      }

      const status = health.totalErrors > 0 ? '❌' : health.totalWarnings > 0 ? '⚠️' : '✅';
      console.log(`\n${status} Module: ${moduleName}`);
      console.log(`   Files: ${health.totalFiles} | Errors: ${health.totalErrors} | Warnings: ${health.totalWarnings}`);
      
      if (health.totalErrors > 0) {
        console.log(`   Top errors:`);
        health.errors
          .filter(e => e.category === 'error')
          .slice(0, 3)
          .forEach(error => {
            console.log(`     • ${path.basename(error.file)}:${error.line} - ${error.message.substring(0, 60)}...`);
          });
      }
    });

    console.log('\n' + '-'.repeat(80));
    console.log(`📈 Summary: ${healthyModules}/${this.moduleHealth.size} modules healthy`);
    console.log(`   Total Errors: ${totalErrors} | Total Warnings: ${totalWarnings}`);
    console.log('='.repeat(80) + '\n');
  }

  /**
   * Get module health report
   */
  public getModuleHealth(moduleName?: string): ModuleHealth | Map<string, ModuleHealth> {
    if (moduleName) {
      return this.moduleHealth.get(moduleName) || {
        moduleName,
        totalFiles: 0,
        filesWithErrors: 0,
        totalErrors: 0,
        totalWarnings: 0,
        lastChecked: new Date(),
        errors: []
      };
    }
    return this.moduleHealth;
  }

  /**
   * Get all errors
   */
  public getAllErrors(): CompilationError[] {
    const allErrors: CompilationError[] = [];
    this.moduleHealth.forEach(health => {
      allErrors.push(...health.errors);
    });
    return allErrors;
  }

  /**
   * Export health report to JSON
   */
  public exportHealthReport(outputPath: string): void {
    const report = {
      timestamp: new Date().toISOString(),
      modules: Array.from(this.moduleHealth.values()),
      summary: {
        totalModules: this.moduleHealth.size,
        totalErrors: Array.from(this.moduleHealth.values()).reduce((sum, h) => sum + h.totalErrors, 0),
        totalWarnings: Array.from(this.moduleHealth.values()).reduce((sum, h) => sum + h.totalWarnings, 0)
      }
    };

    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf-8');
    logger.info(`📄 Health report exported to ${outputPath}`);
  }

  /**
   * Enable/disable auto-fix
   */
  public setAutoFix(enabled: boolean): void {
    this.autoFix = enabled;
    logger.info(`🔧 Auto-fix ${enabled ? 'ENABLED' : 'DISABLED'}`);
  }

  /**
   * Get auto-fix status
   */
  public getAutoFix(): boolean {
    return this.autoFix;
  }

  /**
   * Perform initial scan of all TypeScript files
   */
  private performInitialScan(): void {
    logger.info('🔍 Performing initial scan of TypeScript files...');
    
    for (const watchPath of this.watchedPaths) {
      this.scanDirectory(watchPath);
    }
  }

  /**
   * Recursively scan directory for TypeScript files
   */
  private scanDirectory(dirPath: string): void {
    try {
      if (!fs.existsSync(dirPath)) {
        return;
      }

      const files = fs.readdirSync(dirPath);
      
      for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          // Skip node_modules and other common directories
          if (!file.startsWith('.') && file !== 'node_modules' && file !== 'dist') {
            this.scanDirectory(filePath);
          }
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
          // Check this TypeScript file
          setTimeout(() => {
            this.checkFile(filePath);
          }, 100); // Small delay to avoid overwhelming the system
        }
      }
    } catch (error) {
      // Ignore errors and continue
    }
  }
}

