import { inject, Injectable, isDevMode } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';

import { from, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { isFeatureFlag } from './feature-flag';
import { CONFIGURATION, FEATURE_FLAG_SERVICE } from './tokens';

/**
 * A preloading strategy that uses feature flags to determine whether or not to
 * preload a module.
 *
 * @publicApi
 */
@Injectable({ providedIn: 'root' })
export class FeatureFlagPreloadingStrategy implements PreloadingStrategy {
  private readonly _configuration = inject(CONFIGURATION);
  private readonly _featureFlagService = inject(FEATURE_FLAG_SERVICE);

  /**
   * Preloads the specified route if its feature flag is enabled.
   *
   * @param route - The route to be preloaded.
   * @param load - A function that returns an observable that loads the route's
   * module.
   * @returns An observable that emits when the route is preloaded, or null if
   * the feature flag is not enabled or not specified.
   * @throws An error if the route's feature flag is invalid or if the
   * `isEnabled()` method of the feature flag service returns an unhandled type.
   *
   * @publicApi
   */
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    const { keys } = this._configuration.routing;
    const featureFlag = route.data?.[keys.featureFlag];

    if (!featureFlag) {
      const { validIfNone } = this._configuration.routing;
      if (isDevMode() && !validIfNone) {
        console.warn(
          `Route ${route.path} does not have a feature flag specified`
        );
      }

      return of(null);
    }

    if (!isFeatureFlag(featureFlag)) {
      throw new Error(
        `Route ${route.path} has an invalid feature flag: ${featureFlag}`
      );
    }

    const isEnabled = this._featureFlagService.isEnabled(featureFlag);

    if (typeof isEnabled === 'boolean' && isEnabled) {
      return load();
    }

    if (isEnabled instanceof Promise) {
      return from(isEnabled).pipe(
        mergeMap(isEnabled => (isEnabled ? load() : of(null)))
      );
    }

    if (isEnabled instanceof Observable) {
      return isEnabled.pipe(
        mergeMap(isEnabled => (isEnabled ? load() : of(null)))
      );
    }

    throw new Error('Unhandled return type of `FeatureFlagService#isEnabled`');
  }
}
