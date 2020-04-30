import chalk from 'chalk';
import winston, { format } from 'winston';
import getEnvironment from '../utils/getEnvironment';

/**
 * Used during the transformation pipeline
 */
interface TransformableInfo {
  /**
   * Log level
   */
  level: string;
  /**
   * Message
   */
  message: string;
}

/**
 * Log level options (in order of relevance)
 */
type LogLevel = 'error' | 'warn' | 'info' | 'verbose' | 'debug';

/**
 * Function removes the colors for the message
 */
const removeColors = format(
  (info: TransformableInfo): TransformableInfo => {
    const newInfo = { message: info.message, level: info.level };
    newInfo.message = newInfo.message
      .replace(
        // eslint-disable-next-line no-control-regex
        /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
        '',
      )
      // eslint-disable-next-line no-control-regex
      .replace(new RegExp('\b', 'g'), '');
    return newInfo;
  },
);

/**
 * Winston transport model definition
 */
const transports = [
  new winston.transports.File({
    filename: 'log/error.log',
    level: 'error',
    format: removeColors(),
  }),
  new winston.transports.File({
    filename: 'log/combined.log',
    format: format.combine(removeColors(), format.json()),
  }),
];

let defaultLogLevel = 'info';

/**
 * Set the default level depending of the environment:
 * verbose for development and info por production
 */
export const resetDefaultLogLevel = (): void => {
  defaultLogLevel = getEnvironment() === 'development' ? 'verbose' : 'info';
};

resetDefaultLogLevel();

/**
 * Create the winston logger
 */
const logger = winston.createLogger({
  level: defaultLogLevel,
  format: format.json(),
  transports,
});

export const configForCurrentEnvironment = (): void => {
  /**
   * If we're not in production then log to the `console` with the format:
   * `${info.level}: ${info.message} JSON.stringify({ ...rest })`
   */
  if (getEnvironment() !== 'production') {
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    );
  }
};

configForCurrentEnvironment();

/**
 * Prefix to delete previous chars
 */
const prefix = ''.padStart(10, '\b');

/**
 * Logs information
 * @param {string} message message to log
 * @param {object} meta metadata associated with the event
 */
export const info = (message: string, meta?: object): void => {
  logger.info(`${prefix}${message}`, meta);
};

/**
 * Logs an error
 * @param {string} message error to log
 * @param {object} meta metadata associated with the event
 */
export const error = (message: string, meta?: object): void => {
  logger.error(`${prefix}${chalk.red.bold('[ERROR]')} ${message}`, meta);
};

/**
 * Logs a warning
 * @param {string} message warning to log
 * @param {object} meta metadata associated with the event
 */
export const warn = (message: string, meta?: object): void => {
  logger.warn(`${prefix}${chalk.yellow.bold('[WARN]')} ${message}`, meta);
};

/**
 * Logs an alert
 * @param {string} message alert to log
 * @param {object} meta metadata associated with the event
 */
export const alert = (message: string, meta?: object): void => {
  logger.error(`${prefix}${chalk.red.bold('[ALERT]')} ${message}`, meta);
};

/**
 * Logs verbose information
 * @param {string} message information to log
 * @param {object} meta metadata associated with the event
 */
export const verbose = (message: string, meta?: object): void => {
  logger.verbose(`${prefix}${message}`, meta);
};

/**
 * Filters the messages to log for a certain level
 * @param {LogLevel} level minimum log level to be displayed that can be
 * in order of relevance: error, warn, info, verbose or debug.
 */
export const setLevel = (level: LogLevel): void => {
  logger.level = level;
};
