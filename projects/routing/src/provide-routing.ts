import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

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
export function provideNgxFlagrRouting(): EnvironmentProviders {
  return makeEnvironmentProviders([]);
}
