import { inject } from '@angular/core';

import { Observable } from 'rxjs';

import { NgxFlagrConfiguration } from './config';
import { FeatureFlag } from './feature-flag';

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
