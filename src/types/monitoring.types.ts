/**
 * Type definitions for the monitoring system
 */

import * as ts from 'typescript';

/**
 * Import suggestion for fixing missing imports
 */
export interface ImportSuggestion {
  /** File path where the import is needed */
  file: string;
  
  /** Line number where the error occurs */
  line: number;
  
  /** Name of the missing symbol */
  missingSymbol: string;
  
  /** Suggested import statement */
  suggestedImport: string;
  
  /** Path to the module containing the symbol */
  suggestedPath: string;
  
  /** Whether this can be automatically fixed */
  autoFixable: boolean;
}

/**
 * Error report for a file
 */
export interface ErrorReport {
  /** File path */
  file: string;
  
  /** TypeScript diagnostics (errors) */
  errors: ts.Diagnostic[];
  
  /** Import suggestions for fixing errors */
  importSuggestions: ImportSuggestion[];
  
  /** Timestamp when the report was generated */
  timestamp: Date;
}

/**
 * Compilation error details
 */
export interface CompilationError {
  /** File path */
  file: string;
  
  /** Line number (1-based) */
  line: number;
  
  /** Column number (1-based) */
  column: number;
  
  /** Error message */
  message: string;
  
  /** TypeScript error code */
  code: number;
  
  /** Error category */
  category: 'error' | 'warning' | 'suggestion' | 'message';
  
  /** Severity level */
  severity: 'high' | 'medium' | 'low';
}

/**
 * Module health information
 */
export interface ModuleHealth {
  /** Module name */
  moduleName: string;
  
  /** Total number of files in the module */
  totalFiles: number;
  
  /** Number of files with errors */
  filesWithErrors: number;
  
  /** Total number of errors */
  totalErrors: number;
  
  /** Total number of warnings */
  totalWarnings: number;
  
  /** Last time the module was checked */
  lastChecked: Date;
  
  /** List of all errors in the module */
  errors: CompilationError[];
}

/**
 * Health report summary
 */
export interface HealthReportSummary {
  /** Total number of modules */
  totalModules: number;
  
  /** Total number of errors across all modules */
  totalErrors: number;
  
  /** Total number of warnings across all modules */
  totalWarnings: number;
  
  /** Number of healthy modules (no errors) */
  healthyModules?: number;
  
  /** Number of modules with errors */
  modulesWithErrors?: number;
}

/**
 * Complete health report
 */
export interface HealthReport {
  /** Timestamp when the report was generated */
  timestamp: string;
  
  /** Health information for each module */
  modules: ModuleHealth[];
  
  /** Summary statistics */
  summary: HealthReportSummary;
}

/**
 * Watcher configuration options
 */
export interface WatcherOptions {
  /** Paths to watch */
  paths: string[];
  
  /** Enable auto-fix for imports */
  autoFix?: boolean;
  
  /** Patterns to ignore */
  ignored?: string | RegExp | ((path: string) => boolean);
  
  /** Debounce delay in milliseconds */
  debounceDelay?: number;
  
  /** Enable verbose logging */
  verbose?: boolean;
}

/**
 * Monitor configuration options
 */
export interface MonitorOptions {
  /** Paths to monitor */
  paths: string[];
  
  /** Health check interval in milliseconds */
  checkInterval?: number;
  
  /** Enable periodic reports */
  enablePeriodicReports?: boolean;
  
  /** Report export path */
  reportPath?: string;
  
  /** Enable verbose logging */
  verbose?: boolean;
}

/**
 * Symbol search result
 */
export interface SymbolSearchResult {
  /** Import statement to add */
  importStatement: string;
  
  /** Module path */
  modulePath: string;
  
  /** File where the symbol is defined */
  definitionFile?: string;
  
  /** Symbol type (class, interface, type, const, function) */
  symbolType?: 'class' | 'interface' | 'type' | 'const' | 'function' | 'enum';
}

/**
 * File change event
 */
export interface FileChangeEvent {
  /** File path */
  path: string;
  
  /** Change type */
  type: 'add' | 'change' | 'unlink';
  
  /** Timestamp */
  timestamp: Date;
}

/**
 * Error statistics
 */
export interface ErrorStatistics {
  /** Total errors */
  total: number;
  
  /** Errors by category */
  byCategory: {
    error: number;
    warning: number;
    suggestion: number;
    message: number;
  };
  
  /** Errors by severity */
  bySeverity: {
    high: number;
    medium: number;
    low: number;
  };
  
  /** Most common error codes */
  topErrorCodes: Array<{
    code: number;
    count: number;
    message: string;
  }>;
}

/**
 * Import fix result
 */
export interface ImportFixResult {
  /** File path */
  file: string;
  
  /** Whether the fix was successful */
  success: boolean;
  
  /** Number of imports added */
  importsAdded: number;
  
  /** Import statements that were added */
  addedImports: string[];
  
  /** Error message if fix failed */
  error?: string;
}

/**
 * Monitoring event types
 */
export type MonitoringEventType = 
  | 'file-added'
  | 'file-changed'
  | 'file-deleted'
  | 'error-detected'
  | 'error-fixed'
  | 'import-added'
  | 'health-check'
  | 'report-exported';

/**
 * Monitoring event
 */
export interface MonitoringEvent {
  /** Event type */
  type: MonitoringEventType;
  
  /** Event timestamp */
  timestamp: Date;
  
  /** Event data */
  data: any;
  
  /** Module name (if applicable) */
  module?: string;
  
  /** File path (if applicable) */
  file?: string;
}

/**
 * Monitoring callback function
 */
export type MonitoringCallback = (event: MonitoringEvent) => void;

/**
 * Export format options
 */
export type ExportFormat = 'json' | 'csv' | 'html' | 'markdown';

/**
 * Export options
 */
export interface ExportOptions {
  /** Output file path */
  outputPath: string;
  
  /** Export format */
  format: ExportFormat;
  
  /** Include detailed errors */
  includeDetails?: boolean;
  
  /** Include timestamps */
  includeTimestamps?: boolean;
  
  /** Pretty print (for JSON) */
  prettyPrint?: boolean;
}

