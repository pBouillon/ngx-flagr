import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { NgxFlagrRoutingOptions, createConfiguration } from './config';
import { CONFIGURATION, INITIAL_CONFIGURATION } from './tokens';

/**
 * Provides the ngx-flagr routing utilities' dependencies
 *
 * @returns The dependencies for ngx-flagr routing utilities
 *
 * @usageNotes
 *
 * ```ts
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideNgxFlagr({ featureFlagService: CustomFeatureFlagService }),
 *     provideNgxFlagrRouting(),
 *   ],
 * });
 * ```
 *
 * @publicApi
 */
export function provideNgxFlagrRouting(
  options?: NgxFlagrRoutingOptions
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
  ]);
}
