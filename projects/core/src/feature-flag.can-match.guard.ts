import { inject, isDevMode } from '@angular/core';
import { CanMatchFn, Route, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';

import { isFeatureFlag } from './feature-flag';
import { CONFIGURATION, FEATURE_FLAG_SERVICE } from './tokens';

/**
 * A function that checks whether a route can be activated based on the presence
 * and value of a feature flag in the route's data object.
 *
 * @param route - The route to check.
 * @returns A boolean, a {@link UrlTree}, a {@link Promise} of either of these
 * types, or an {@link Observable} emitting any of these types. The value
 * indicates whether the route can be activated.
 *
 * @throws An error if the feature flag specified in the route's data object is
 * not a valid feature flag.
 */
export const canMatchFeatureFlag: CanMatchFn = (
  route: Route
): Observable<boolean> | Promise<boolean> | boolean => {
  const { routing } = inject(CONFIGURATION);

  const { featureFlagKey } = routing;
  const featureFlag = route.data?.[featureFlagKey];

  if (!featureFlag) {
    const { validIfNone } = routing;
    if (isDevMode() && !validIfNone) {
      console.warn(
        `Route ${route.path} does not have a feature flag specified`
      );
    }

    return validIfNone;
  }

  if (!isFeatureFlag(featureFlag)) {
    throw new Error(
      `Route ${route.path} has an invalid feature flag: ${featureFlag}`
    );
  }

  return inject(FEATURE_FLAG_SERVICE).isEnabled(featureFlag);
};
