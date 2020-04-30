let forceSpecificEnvironment: string;

/**
 * Allows you force an specific environment
 * @param {string} environment Environment to force: development, production, etc.
 */
export const setForceSpecificEnvironment = (environment: string): void => {
  forceSpecificEnvironment = environment;
};

/**
 * Gets the current node environment
 * @returns {string} current node environment
 */
const getEnvironment = (): string => {
  if (forceSpecificEnvironment) {
    return forceSpecificEnvironment;
  }
  return process.env.NODE_ENV;
};

export default getEnvironment;