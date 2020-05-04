/**
 * Log level options (in order of relevance)
 */
declare type LogLevel = 'error' | 'warn' | 'info' | 'verbose' | 'debug';
/**
 * Set the default level depending of the environment:
 * verbose for development and info por production
 */
export declare const resetDefaultLogLevel: () => void;
export declare const configForCurrentEnvironment: () => void;
/**
 * Logs information
 * @param {string} message message to log
 * @param {object} meta metadata associated with the event
 */
export declare const info: (message: string, meta?: object) => void;
/**
 * Logs an error
 * @param {string} message error to log
 * @param {object} meta metadata associated with the event
 */
export declare const error: (message: string, meta?: object) => void;
/**
 * Logs a warning
 * @param {string} message warning to log
 * @param {object} meta metadata associated with the event
 */
export declare const warn: (message: string, meta?: object) => void;
/**
 * Logs an alert
 * @param {string} message alert to log
 * @param {object} meta metadata associated with the event
 */
export declare const alert: (message: string, meta?: object) => void;
/**
 * Logs verbose information
 * @param {string} message information to log
 * @param {object} meta metadata associated with the event
 */
export declare const verbose: (message: string, meta?: object) => void;
/**
 * Filters the messages to log for a certain level
 * @param {LogLevel} level minimum log level to be displayed that can be
 * in order of relevance: error, warn, info, verbose or debug.
 */
export declare const setLevel: (level: LogLevel) => void;
export {};
