import { inject } from '@angular/core';

import { Observable } from 'rxjs';

import { NgxFlagrConfiguration } from './config';

/**
 * A FeatureFlag can be a string or an array of strings representing one or more feature flags.
 *
 * @publicApi
 */
export type FeatureFlag = string | string[];

/**
 * Service responsible for retrieving feature flag information.
 *
 * @publicApi
 */
export interface FeatureFlagService {
  /**
   * Checks if a given feature flag is enabled.
   * @param featureFlag - The feature flag to check.
   * @returns An Observable, Promise or boolean indicating if the feature flag is enabled.
   */
  isEnabled(
    featureFlag: FeatureFlag
  ): Observable<boolean> | Promise<boolean> | boolean;
}

export function createFeatureFlagService({
  featureFlagService,
}: NgxFlagrConfiguration): FeatureFlagService {
  return inject(featureFlagService);
}
