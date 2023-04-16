import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { FeatureFlagDirective } from './feature-flag.directive';
import { createFeatureFlagService } from './feature-flag.service';
import { createConfiguration, NgxFlagrOptions } from './config';
import {
  INITIAL_CONFIGURATION,
  CONFIGURATION,
  FEATURE_FLAG_SERVICE,
} from './tokens';

export function provideNgxFlagr(
  options: NgxFlagrOptions
): EnvironmentProviders {
  return makeEnvironmentProviders([
    FeatureFlagDirective,
    {
      provide: INITIAL_CONFIGURATION,
      useValue: options,
    },
    {
      provide: CONFIGURATION,
      deps: [INITIAL_CONFIGURATION],
      useFactory: createConfiguration,
    },
    {
      provide: FEATURE_FLAG_SERVICE,
      deps: [CONFIGURATION],
      useFactory: createFeatureFlagService,
    },
  ]);
}
