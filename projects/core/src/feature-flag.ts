import { Observable } from 'rxjs';

/**
 * A FeatureFlag can be a string or an array of strings representing one or more feature flags.
 *
 * @publicApi
 */
export type FeatureFlag = string | string[];

/**
 * Represents the result of evaluating a feature flag.
 * @typedef {boolean | Observable<boolean> | Promise<boolean>} FeatureFlagEvaluationResult
 *
 * @publicApi
 */
export type FeatureFlagEvaluationResult =
  | boolean
  | Observable<boolean>
  | Promise<boolean>;

/**
 * Checks if the provided value is a FeatureFlag or not.
 * @param {unknown} featureFlag - The value to be checked.
 * @returns {featureFlag is FeatureFlag} - True if the provided value is a FeatureFlag, false otherwise.
 *
 * @publicApi
 */
export const isFeatureFlag = (
  featureFlag: unknown
): featureFlag is FeatureFlag =>
  typeof featureFlag === 'string' ||
  (Array.isArray(featureFlag) &&
    featureFlag.every(flag => typeof flag === 'string'));
