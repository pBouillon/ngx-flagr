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
