import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';

import { isFeatureFlag } from './feature-flag';
import { FEATURE_FLAG_SERVICE } from './tokens';

export const canMatchFeatureFlag: CanMatchFn = (
  route: Route
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const featureFlag = route.data?.['featureFlag'];

  if (!featureFlag) {
    console.error(`Route ${route.path} does not have a feature flag specified`);
    return false;
  }

  if (!isFeatureFlag(featureFlag)) {
    console.error(
      `Route ${route.path} has an invalid feature flag: ${featureFlag}`
    );
    return false;
  }

  return inject(FEATURE_FLAG_SERVICE).isEnabled(featureFlag);
};
