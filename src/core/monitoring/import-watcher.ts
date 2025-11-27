import chokidar from 'chokidar';
import * as ts from 'typescript';
import * as path from 'path';
import * as fs from 'fs';
import logger from '../utils/logger';

interface ImportSuggestion {
  file: string;
  line: number;
  missingSymbol: string;
  suggestedImport: string;
  suggestedPath: string;
  autoFixable: boolean;
}

interface ErrorReport {
  file: string;
  errors: ts.Diagnostic[];
  importSuggestions: ImportSuggestion[];
  timestamp: Date;
}

export class ImportWatcher {
  private watcher: chokidar.FSWatcher | null = null;
  private program: ts.Program | null = null;
  private host: ts.CompilerHost | null = null;
  private configPath: string;
  private watchedPaths: string[];
  private autoFix: boolean;
  private errorReports: Map<string, ErrorReport> = new Map();

  constructor(
    watchPaths: string[] = ['src'],
    autoFix: boolean = false
  ) {
    this.configPath = path.resolve(process.cwd(), 'tsconfig.json');
    this.watchedPaths = watchPaths.map(p => path.resolve(process.cwd(), p));
    this.autoFix = autoFix;
  }

  /**
   * Start watching for file changes
   */
  public start(): void {
    logger.info('🔍 Starting Import Watcher...');
    
    // Initialize TypeScript program
    this.initializeTypeScriptProgram();

    // Setup file watcher
    this.watcher = chokidar.watch(this.watchedPaths, {
      ignored: /(^|[\/\\])\../, // ignore dotfiles
      persistent: true,
      ignoreInitial: false,
      awaitWriteFinish: {
        stabilityThreshold: 500,
        pollInterval: 100
      }
    });

    this.watcher
      .on('add', (filePath: string) => this.handleFileChange(filePath, 'added'))
      .on('change', (filePath: string) => this.handleFileChange(filePath, 'changed'))
      .on('unlink', (filePath: string) => this.handleFileDelete(filePath))
      .on('error', (error: any) => logger.error(`Watcher error: ${error}`))
      .on('ready', () => {
        logger.info('✅ Import Watcher is ready and monitoring files');
        logger.info(`📂 Watching: ${this.watchedPaths.join(', ')}`);
        logger.info(`🔧 Auto-fix: ${this.autoFix ? 'ENABLED' : 'DISABLED'}`);
      });
  }

  /**
   * Stop watching
   */
  public async stop(): Promise<void> {
    if (this.watcher) {
      await this.watcher.close();
      logger.info('🛑 Import Watcher stopped');
    }
  }

  /**
   * Initialize TypeScript program with compiler API
   */
  private initializeTypeScriptProgram(): void {
    try {
      // Read tsconfig.json
      const configFile = ts.readConfigFile(this.configPath, ts.sys.readFile);
      if (configFile.error) {
        logger.error('Error reading tsconfig.json:', configFile.error);
        return;
      }

      // Parse tsconfig.json
      const parsedConfig = ts.parseJsonConfigFileContent(
        configFile.config,
        ts.sys,
        path.dirname(this.configPath)
      );

      // Create compiler host
      this.host = ts.createCompilerHost(parsedConfig.options);

      // Create program
      this.program = ts.createProgram({
        rootNames: parsedConfig.fileNames,
        options: parsedConfig.options,
        host: this.host
      });

      logger.info('✅ TypeScript program initialized');
    } catch (error) {
      logger.error('Failed to initialize TypeScript program:', error);
    }
  }

  /**
   * Handle file changes
   */
  private async handleFileChange(filePath: string, changeType: 'added' | 'changed'): Promise<void> {
    // Only process TypeScript files
    if (!filePath.endsWith('.ts') && !filePath.endsWith('.tsx')) {
      return;
    }

    logger.info(`📝 File ${changeType}: ${filePath}`);

    // Reinitialize program to pick up changes
    this.initializeTypeScriptProgram();

    // Check for errors
    await this.checkFileForErrors(filePath);
  }

  /**
   * Handle file deletion
   */
  private handleFileDelete(filePath: string): void {
    logger.info(`🗑️ File deleted: ${filePath}`);
    this.errorReports.delete(filePath);
  }

  /**
   * Check a file for TypeScript errors and import issues
   */
  private async checkFileForErrors(filePath: string): Promise<void> {
    if (!this.program) {
      logger.warn('TypeScript program not initialized');
      return;
    }

    const sourceFile = this.program.getSourceFile(filePath);
    if (!sourceFile) {
      logger.warn(`Source file not found in program: ${filePath}`);
      return;
    }

    // Get all diagnostics for the file
    const syntacticDiagnostics = this.program.getSyntacticDiagnostics(sourceFile);
    const semanticDiagnostics = this.program.getSemanticDiagnostics(sourceFile);
    const allDiagnostics = [...syntacticDiagnostics, ...semanticDiagnostics];

    if (allDiagnostics.length === 0) {
      logger.info(`✅ No errors in ${path.basename(filePath)}`);
      this.errorReports.delete(filePath);
      return;
    }

    // Filter import-related errors
    const importErrors = allDiagnostics.filter(diagnostic => 
      this.isImportRelatedError(diagnostic)
    );

    if (importErrors.length > 0) {
      logger.warn(`⚠️ Found ${importErrors.length} import-related error(s) in ${path.basename(filePath)}`);
      
      // Generate import suggestions
      const suggestions = await this.generateImportSuggestions(filePath, importErrors, sourceFile);
      
      // Create error report
      const report: ErrorReport = {
        file: filePath,
        errors: importErrors,
        importSuggestions: suggestions,
        timestamp: new Date()
      };

      this.errorReports.set(filePath, report);

      // Display suggestions
      this.displayErrorReport(report);

      // Auto-fix if enabled
      if (this.autoFix && suggestions.some(s => s.autoFixable)) {
        await this.applyAutoFixes(filePath, suggestions);
      }
    }

    // Log other errors
    const otherErrors = allDiagnostics.filter(d => !this.isImportRelatedError(d));
    if (otherErrors.length > 0) {
      logger.warn(`⚠️ Found ${otherErrors.length} other error(s) in ${path.basename(filePath)}`);
      otherErrors.forEach(diagnostic => {
        const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        const { line } = sourceFile.getLineAndCharacterOfPosition(diagnostic.start || 0);
        logger.error(`  Line ${line + 1}: ${message}`);
      });
    }
  }

  /**
   * Check if a diagnostic is import-related
   */
  private isImportRelatedError(diagnostic: ts.Diagnostic): boolean {
    const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
    
    const importErrorPatterns = [
      /Cannot find module/i,
      /Cannot find name/i,
      /Module .* has no exported member/i,
      /Could not find a declaration file/i,
      /has no default export/i,
      /is not a module/i
    ];

    return importErrorPatterns.some(pattern => pattern.test(message));
  }

  /**
   * Generate import suggestions for errors
   */
  private async generateImportSuggestions(
    filePath: string,
    diagnostics: ts.Diagnostic[],
    sourceFile: ts.SourceFile
  ): Promise<ImportSuggestion[]> {
    const suggestions: ImportSuggestion[] = [];
    const processedSymbols = new Map<string, ImportSuggestion>(); // Track symbols we've already processed

    for (const diagnostic of diagnostics) {
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      const { line } = sourceFile.getLineAndCharacterOfPosition(diagnostic.start || 0);

      // Extract missing symbol name
      const symbolMatch = message.match(/Cannot find name ['"](.+?)['"]/);
      const moduleMatch = message.match(/Cannot find module ['"](.+?)['"]/);
      const memberMatch = message.match(/Module .* has no exported member ['"](.+?)['"]/);

      if (symbolMatch) {
        const missingSymbol = symbolMatch[1];

        // Check if we've already processed this symbol
        if (processedSymbols.has(missingSymbol)) {
          // Add a reference to the existing suggestion but don't create a duplicate
          const existingSuggestion = processedSymbols.get(missingSymbol)!;
          suggestions.push({
            ...existingSuggestion,
            line: line + 1, // Update line number for this occurrence
          });
          continue;
        }

        const suggestion = await this.findSymbolInProject(missingSymbol, filePath);

        if (suggestion) {
          const importSuggestion: ImportSuggestion = {
            file: filePath,
            line: line + 1,
            missingSymbol,
            suggestedImport: suggestion.importStatement,
            suggestedPath: suggestion.modulePath,
            autoFixable: true
          };

          suggestions.push(importSuggestion);
          processedSymbols.set(missingSymbol, importSuggestion);
        }
      } else if (moduleMatch) {
        const missingModule = moduleMatch[1];
        suggestions.push({
          file: filePath,
          line: line + 1,
          missingSymbol: missingModule,
          suggestedImport: `// Check if module path is correct: ${missingModule}`,
          suggestedPath: missingModule,
          autoFixable: false
        });
      } else if (memberMatch) {
        const missingMember = memberMatch[1];
        suggestions.push({
          file: filePath,
          line: line + 1,
          missingSymbol: missingMember,
          suggestedImport: `// Check if '${missingMember}' is exported from the module`,
          suggestedPath: '',
          autoFixable: false
        });
      }
    }

    return suggestions;
  }

  /**
   * Find a symbol in the project and suggest import
   */
  private async findSymbolInProject(
    symbolName: string,
    currentFilePath: string
  ): Promise<{ importStatement: string; modulePath: string } | null> {
    const projectRoot = process.cwd();
    const searchDirs = ['src/modules', 'src/core', 'src/loaders', 'src/types'];

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
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        const result = await this.searchSymbolInDirectory(filePath, symbolName, currentFilePath);
        if (result) return result;
      } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Check for class, interface, type, const, function exports
        const exportPatterns = [
          new RegExp(`export\\s+class\\s+${symbolName}\\b`),
          new RegExp(`export\\s+interface\\s+${symbolName}\\b`),
          new RegExp(`export\\s+type\\s+${symbolName}\\b`),
          new RegExp(`export\\s+const\\s+${symbolName}\\b`),
          new RegExp(`export\\s+function\\s+${symbolName}\\b`),
          new RegExp(`export\\s+{[^}]*\\b${symbolName}\\b[^}]*}`),
        ];

        if (exportPatterns.some(pattern => pattern.test(content))) {
          // Generate relative or alias import path
          const importPath = this.generateImportPath(filePath, currentFilePath);
          return {
            importStatement: `import { ${symbolName} } from '${importPath}';`,
            modulePath: importPath
          };
        }
      }
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
   * Display error report with suggestions
   */
  private displayErrorReport(report: ErrorReport): void {
    console.log('\n' + '='.repeat(80));
    console.log(`📋 Error Report: ${path.basename(report.file)}`);
    console.log(`⏰ Time: ${report.timestamp.toLocaleString()}`);
    console.log('='.repeat(80));

    // Group suggestions by symbol to show occurrences
    const groupedSuggestions = new Map<string, ImportSuggestion[]>();
    report.importSuggestions.forEach(suggestion => {
      const key = suggestion.missingSymbol;
      if (!groupedSuggestions.has(key)) {
        groupedSuggestions.set(key, []);
      }
      groupedSuggestions.get(key)!.push(suggestion);
    });

    let index = 1;
    groupedSuggestions.forEach((suggestions, symbol) => {
      const firstSuggestion = suggestions[0];
      const lines = suggestions.map(s => s.line).join(', ');
      const occurrences = suggestions.length;

      console.log(`\n${index}. Missing '${symbol}' (${occurrences} occurrence${occurrences > 1 ? 's' : ''} on line${occurrences > 1 ? 's' : ''}: ${lines})`);
      console.log(`   💡 Suggestion: ${firstSuggestion.suggestedImport}`);
      console.log(`   🔧 Auto-fixable: ${firstSuggestion.autoFixable ? 'YES' : 'NO'}`);
      index++;
    });

    console.log('\n' + '='.repeat(80) + '\n');
  }

  /**
   * Apply auto-fixes to the file
   */
  private async applyAutoFixes(filePath: string, suggestions: ImportSuggestion[]): Promise<void> {
    const fixableSuggestions = suggestions.filter(s => s.autoFixable);
    if (fixableSuggestions.length === 0) return;

    let content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    // Deduplicate import statements by import path
    const uniqueImports = new Map<string, string>();
    fixableSuggestions.forEach(suggestion => {
      // Use the import statement as key to avoid duplicates
      const importKey = suggestion.suggestedImport.trim();
      if (!uniqueImports.has(importKey)) {
        uniqueImports.set(importKey, suggestion.suggestedImport);
      }
    });

    // Check if imports already exist in the file
    const existingImports = new Set<string>();
    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('import ')) {
        existingImports.add(trimmedLine);
      }
    });

    // Filter out imports that already exist
    const newImports: string[] = [];
    uniqueImports.forEach((importStatement, key) => {
      const trimmedImport = importStatement.trim();
      // Check if this exact import or similar import already exists
      let alreadyExists = false;
      existingImports.forEach(existing => {
        if (existing === trimmedImport || existing.includes(trimmedImport.substring(7))) {
          alreadyExists = true;
        }
      });

      if (!alreadyExists) {
        newImports.push(importStatement);
      }
    });

    if (newImports.length === 0) {
      logger.info(`ℹ️ All imports already exist in ${path.basename(filePath)}`);
      return;
    }

    logger.info(`🔧 Applying ${newImports.length} unique import(s) to ${path.basename(filePath)}`);

    // Find the last import statement
    let lastImportIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('import ')) {
        lastImportIndex = i;
      }
    }

    // Add new imports after the last import
    const insertIndex = lastImportIndex >= 0 ? lastImportIndex + 1 : 0;

    lines.splice(insertIndex, 0, ...newImports);

    // Write back to file
    fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');

    logger.info(`✅ Auto-fixes applied to ${path.basename(filePath)}`);
  }

  /**
   * Get current error reports
   */
  public getErrorReports(): Map<string, ErrorReport> {
    return this.errorReports;
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
}

