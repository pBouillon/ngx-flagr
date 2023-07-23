import { FeatureFlag, FeatureFlagEvaluationResult } from './feature-flag';
import { FeatureFlagService } from './feature-flag.service';

/**
 * Service to manage feature flags using a Map-based approach.
 */
export class MapBasedFeatureFlagService implements FeatureFlagService {
  /**
   * Map to store the feature flags.
   * @type {Map<FeatureFlag, FeatureFlagEvaluationResult>}
   */
  readonly #featureFlags: Map<FeatureFlag, FeatureFlagEvaluationResult>;

  /**
   * Constructs a new MapBasedFeatureFlagService.
   *
   * @constructor
   * @param {Record<string, FeatureFlagEvaluationResult>} featureFlags An
   * object containing feature flags as keys and corresponding boolean values.
   */
  constructor(featureFlags: Record<string, FeatureFlagEvaluationResult>) {
    this.#featureFlags = new Map<FeatureFlag, FeatureFlagEvaluationResult>(
      Object.entries(featureFlags)
    );
  }

  /**
   * Checks if a specific feature flag is enabled.
   *
   * @param {FeatureFlag} featureFlag - The feature flag to check.
   * @returns {FeatureFlagEvaluationResult} - The value of the feature flag
   * (true if enabled, false if disabled).
   */
  isEnabled(featureFlag: FeatureFlag): FeatureFlagEvaluationResult {
    return this.#featureFlags.get(featureFlag) ?? false;
  }
}

/**
 * Creates a new instance of `MapBasedFeatureFlagService` from a Record of
 * feature flag entries.
 *
 * @param {Record<string, FeatureFlagEvaluationResult>} entries - An object
 * containing feature flags as keys and corresponding evaluation results.
 * @returns {MapBasedFeatureFlagService} - A new instance of
 * {@link MapBasedFeatureFlagService} initialized with the provided feature flag
 * entries.
 *
 * @publicApi
 */
export const createFromEntries = (
  entries: Record<string, FeatureFlagEvaluationResult>
): MapBasedFeatureFlagService => {
  return new MapBasedFeatureFlagService(entries);
};
