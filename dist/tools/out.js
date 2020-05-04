"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const winston_1 = __importStar(require("winston"));
const getEnvironment_1 = __importDefault(require("../utils/getEnvironment"));
/**
 * Function removes the colors for the message
 */
const removeColors = winston_1.format((info) => {
    const newInfo = { message: info.message, level: info.level };
    newInfo.message = newInfo.message
        .replace(
    // eslint-disable-next-line no-control-regex
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')
        // eslint-disable-next-line no-control-regex
        .replace(new RegExp('\b', 'g'), '');
    return newInfo;
});
/**
 * Winston transport model definition
 */
const transports = [
    new winston_1.default.transports.File({
        filename: 'log/error.log',
        level: 'error',
        format: removeColors(),
    }),
    new winston_1.default.transports.File({
        filename: 'log/combined.log',
        format: winston_1.format.combine(removeColors(), winston_1.format.json()),
    }),
];
let defaultLogLevel = 'info';
/**
 * Set the default level depending of the environment:
 * verbose for development and info por production
 */
exports.resetDefaultLogLevel = () => {
    defaultLogLevel = getEnvironment_1.default() === 'development' ? 'verbose' : 'info';
};
exports.resetDefaultLogLevel();
/**
 * Create the winston logger
 */
const logger = winston_1.default.createLogger({
    level: defaultLogLevel,
    format: winston_1.format.json(),
    transports,
});
exports.configForCurrentEnvironment = () => {
    /**
     * If we're not in production then log to the `console` with the format:
     * `${info.level}: ${info.message} JSON.stringify({ ...rest })`
     */
    if (getEnvironment_1.default() !== 'production') {
        logger.add(new winston_1.default.transports.Console({
            format: winston_1.default.format.simple(),
        }));
    }
};
exports.configForCurrentEnvironment();
/**
 * Prefix to delete previous chars
 */
const prefix = ''.padStart(10, '\b');
/**
 * Logs information
 * @param {string} message message to log
 * @param {object} meta metadata associated with the event
 */
exports.info = (message, meta) => {
    logger.info(`${prefix}${message}`, meta);
};
/**
 * Logs an error
 * @param {string} message error to log
 * @param {object} meta metadata associated with the event
 */
exports.error = (message, meta) => {
    logger.error(`${prefix}${chalk_1.default.red.bold('[ERROR]')} ${message}`, meta);
};
/**
 * Logs a warning
 * @param {string} message warning to log
 * @param {object} meta metadata associated with the event
 */
exports.warn = (message, meta) => {
    logger.warn(`${prefix}${chalk_1.default.yellow.bold('[WARN]')} ${message}`, meta);
};
/**
 * Logs an alert
 * @param {string} message alert to log
 * @param {object} meta metadata associated with the event
 */
exports.alert = (message, meta) => {
    logger.error(`${prefix}${chalk_1.default.red.bold('[ALERT]')} ${message}`, meta);
};
/**
 * Logs verbose information
 * @param {string} message information to log
 * @param {object} meta metadata associated with the event
 */
exports.verbose = (message, meta) => {
    logger.verbose(`${prefix}${message}`, meta);
};
/**
 * Filters the messages to log for a certain level
 * @param {LogLevel} level minimum log level to be displayed that can be
 * in order of relevance: error, warn, info, verbose or debug.
 */
exports.setLevel = (level) => {
    logger.level = level;
};
