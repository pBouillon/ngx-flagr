import { inject } from '@angular/core';

import { NgxFlagrConfiguration } from './config';
import { FeatureFlag, FeatureFlagEvaluationResult } from './feature-flag';

/**
 * Service responsible for retrieving feature flag information.
 *
 * @publicApi
 */
export interface FeatureFlagService {
  /**
   * Checks if a given feature flag is enabled.
   * @param featureFlag - The feature flag to check.
   * @returns - An Observable, Promise or boolean indicating if the feature flag is enabled.
   */
  isEnabled(featureFlag: FeatureFlag): FeatureFlagEvaluationResult;
}

export function createFeatureFlagService({
  featureFlagService,
}: NgxFlagrConfiguration): FeatureFlagService {
  return inject(featureFlagService);
}
