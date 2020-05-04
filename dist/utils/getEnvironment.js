"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let forceSpecificEnvironment;
/**
 * Allows you force an specific environment
 * @param {string} environment Environment to force: development, production, etc.
 */
exports.setForceSpecificEnvironment = (environment) => {
    forceSpecificEnvironment = environment;
};
/**
 * Gets the current node environment
 * @returns {string} current node environment
 */
const getEnvironment = () => {
    if (forceSpecificEnvironment) {
        return forceSpecificEnvironment;
    }
    return process.env.NODE_ENV;
};
exports.default = getEnvironment;
//# sourceMappingURL=getEnvironment.js.map