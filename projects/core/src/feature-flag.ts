/**
 * A FeatureFlag can be a string or an array of strings representing one or more feature flags.
 *
 * @publicApi
 */
export type FeatureFlag = string | string[];

/**
 * Checks if the provided value is a FeatureFlag or not.
 * @param {unknown} featureFlag - The value to be checked.
 * @returns {featureFlag is FeatureFlag} - True if the provided value is a FeatureFlag, false otherwise.
 */
export const isFeatureFlag = (
  featureFlag: unknown
): featureFlag is FeatureFlag =>
  typeof featureFlag === 'string' ||
  (Array.isArray(featureFlag) &&
    featureFlag.every(flag => typeof flag === 'string'));
