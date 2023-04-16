import { InjectionToken } from '@angular/core';

import { FeatureFlagService } from './feature-flag.service';
import { NgxFlagrConfiguration } from './config';

export const INITIAL_CONFIGURATION = new InjectionToken<NgxFlagrConfiguration>(
  '@ngx-flagr/core initial configuration'
);

export const CONFIGURATION = new InjectionToken<NgxFlagrConfiguration>(
  '@ngx-flagr/core configuration'
);

/**
 * Injection token for the FeatureFlagService used in ngx-flagr.
 *
 * @remarks
 * If not provided, this will throw an error when attempting to inject this token.
 *
 * @publicApi
 */
export const FEATURE_FLAG_SERVICE = new InjectionToken<FeatureFlagService>(
  '@ngx-flagr/core feature flag service',
  {
    factory: () => {
      throw new Error('FeatureFlagService implementation not provided.');
    },
  }
);
