import { out, version } from '../../index';

/**
 * Check basic info log generation
 */
test('Check basic info log', (): void => {
  expect((): void => out.info('Write info log text')).not.toThrowError();
});

/**
 * Version number
 */
test('Check basic info log', (): void => {
  expect(version.split('.')).toHaveLength(3);
});
