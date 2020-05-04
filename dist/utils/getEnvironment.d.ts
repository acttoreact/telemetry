/**
 * Allows you force an specific environment
 * @param {string} environment Environment to force: development, production, etc.
 */
export declare const setForceSpecificEnvironment: (environment: string) => void;
/**
 * Gets the current node environment
 * @returns {string} current node environment
 */
declare const getEnvironment: () => string;
export default getEnvironment;
