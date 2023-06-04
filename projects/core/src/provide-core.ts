import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { createConfiguration, NgxFlagrOptions } from './config';
import { createFeatureFlagService } from './feature-flag.service';
import {
  CONFIGURATION,
  FEATURE_FLAG_SERVICE,
  INITIAL_CONFIGURATION,
} from './tokens';

/**
 * Provides the ngx-flagr dependencies
 *
 * @param {NgxFlagrOptions} options - The options to configure the dependencies
 * @returns The dependencies for ngx-flagr
 *
 * @usageNotes
 *
 * ```ts
 * bootstrapApplication(AppComponent, {
 *   providers: [provideNgxFlagr({ featureFlagService: CustomFeatureFlagService })],
 * });
 * ```
 *
 * @publicApi
 */
export function provideNgxFlagr(
  options: NgxFlagrOptions
): EnvironmentProviders {
  return makeEnvironmentProviders([
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
