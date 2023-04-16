import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { FeatureFlagDirective } from './feature-flag.directive';
import { createFeatureFlagService } from './feature-flag.service';
import { createConfiguration, NgxFlagrOptions } from './config';
import {
  INITIAL_CONFIGURATION,
  CONFIGURATION,
  FEATURE_FLAG_SERVICE,
} from './tokens';

/**
 * Provides the ngx-flagr dependencies.
 *
 * @param {NgxFlagrOptions} options - The options to configure the dependencies.
 * @returns The dependencies for ngx-flagr.
 *
 * @usageNotes
 * Use this function to provide the dependencies for ngx-flagr in your application. You can configure the feature flag service implementation, and the initial configuration for the library.
 *
 * ### Providing a custom `FeatureFlagService`
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
