import { InjectionToken } from '@angular/core';

import { FeatureFlagService } from './feature-flag.service';
import { NgxFlagrConfiguration } from './config';

export const INITIAL_CONFIGURATION = new InjectionToken<NgxFlagrConfiguration>(
  '@ngx-flagr/core initial configuration'
);

export const CONFIGURATION = new InjectionToken<NgxFlagrConfiguration>(
  '@ngx-flagr/core configuration'
);

export const FEATURE_FLAG_SERVICE = new InjectionToken<FeatureFlagService>(
  '@ngx-flagr/core feature flag service',
  {
    factory: () => {
      throw new Error('FeatureFlagService implementation not provided.');
    },
  }
);
