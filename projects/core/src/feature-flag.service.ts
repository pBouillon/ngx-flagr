import { inject } from '@angular/core';

import { Observable } from 'rxjs';

import { NgxFlagrConfiguration } from './config';

export type FeatureFlag = string | string[];

export interface FeatureFlagService {
  isEnabled(
    featureFlag: FeatureFlag
  ): Observable<boolean> | Promise<boolean> | boolean;
}

export function createFeatureFlagService({
  featureFlagService,
}: NgxFlagrConfiguration): FeatureFlagService {
  return inject(featureFlagService);
}
