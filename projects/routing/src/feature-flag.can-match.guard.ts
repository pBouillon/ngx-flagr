import { inject, isDevMode } from '@angular/core';
import { CanMatchFn, Route, Router, UrlTree } from '@angular/router';

import { FEATURE_FLAG_SERVICE, isFeatureFlag } from '@ngx-flagr/core';
import { Observable, map } from 'rxjs';

import { CONFIGURATION } from './tokens';

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
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const configuration = inject(CONFIGURATION);

  const featureFlagKey = configuration.keys.featureFlag;
  const featureFlag = route.data?.[featureFlagKey];

  if (!featureFlag) {
    if (isDevMode() && !configuration.validIfNone) {
      console.warn(
        `Route ${route.path} does not have a feature flag specified`
      );
    }

    return configuration.validIfNone;
  }

  if (!isFeatureFlag(featureFlag)) {
    throw new Error(
      `Route ${route.path} has an invalid feature flag: ${featureFlag}`
    );
  }

  const isEnabled = inject(FEATURE_FLAG_SERVICE).isEnabled(featureFlag);

  // Takes the redirection URL defined on the route level or on the
  // configuration-level
  const redirectToIfDisabledKey = configuration.keys.redirectToIfDisabled;
  const isRedirectionGloballySet = configuration.redirectToIfDisabled;
  let redirectToIfDisabled =
    route.data?.[redirectToIfDisabledKey] || isRedirectionGloballySet;

  if (!redirectToIfDisabled) {
    return isEnabled;
  }

  const redirectTo = inject(Router).parseUrl(redirectToIfDisabled);

  if (typeof isEnabled === 'boolean') {
    return isEnabled || redirectTo;
  }

  if (isEnabled instanceof Promise) {
    return isEnabled.then(result => result || redirectTo);
  }

  if (isEnabled instanceof Observable) {
    return isEnabled.pipe(map(result => result || redirectTo));
  }

  throw new Error('Unhandled return type of `FeatureFlagService#isEnabled`');
};
