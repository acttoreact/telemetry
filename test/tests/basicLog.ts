import { out, version } from '../../index';
import { setForceSpecificEnvironment } from '../../utils/getEnvironment';

/**
 * Check basic info log generation
 */
test('Check basic info log', (): void => {
  expect((): void => out.info('Write info log text')).not.toThrowError();
});

/**
 * Check basic alert log generation
 */
test('Check basic alert log', (): void => {
  expect((): void => out.alert('Write info log text')).not.toThrowError();
});

/**
 * Check basic error log generation
 */
test('Check basic error log', (): void => {
  expect((): void => out.error('Write info log text')).not.toThrowError();
});

/**
 * Check basic verbose log generation
 */
test('Check basic verbose log', (): void => {
  expect((): void => out.verbose('Write info log text')).not.toThrowError();
});

/**
 * Check basic warn log generation
 */
test('Check basic warn log', (): void => {
  expect((): void => out.warn('Write info log text')).not.toThrowError();
});

/**
 * Check setting log level
 */
test('Check setting log level', (): void => {
  expect((): void => out.setLevel('warn')).not.toThrowError();
});

/**
 * Version number
 */
test('Check basic info log', (): void => {
  expect(version.split('.')).toHaveLength(3);
});


/**
 * Check basic info log in production
 */
test('Check basic info log in production', (): void => {
  setForceSpecificEnvironment('production');  
  out.resetDefaultLogLevel();
  out.configForCurrentEnvironment();
  expect((): void => out.info('Write info log text')).not.toThrowError();
  /** Back to the regular log level */
  setForceSpecificEnvironment('development');  
  out.resetDefaultLogLevel();
  out.configForCurrentEnvironment();
});
