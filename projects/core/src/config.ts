import { Type } from '@angular/core';

import { FeatureFlagService } from './feature-flag.service';

export interface NgxFlagrConfiguration {
  /**
   * The {@link FeatureFlagService} used to evaluate feature flags.
   *
   * @remarks
   * This property can either be a reference to a class implementing the
   * {@link FeatureFlagService} interface, or a function that returns a
   * reference to such a class.
   */
  featureFlagService:
    | Type<FeatureFlagService>
    | (() => Type<FeatureFlagService>);

  /**
   * Routing options for feature flags.
   */
  routing: {
    keys: {
      /**
       * The key used to identify feature flags in the `data` property of Angular
       * routes.
       *
       * @default 'featureFlag'
       */
      featureFlag: string;

      /**
       * The key used to identify the route to which the user will be redirected
       * in the `data` property of Angular routes.
       *
       * @default 'redirectToIfDisabled'
       */
      redirectToIfDisabled: string;
    };

    /**
     * The name of a route to redirect to if the user does not have the feature
     * flag enabled.
     *
     * @default null
     *
     * @remarks
     * If this property is set, and the feature flag for a route is disabled,
     * the user will be redirected to the route with this name. If it is not
     * set, the user will be denied access to the route.
     */
    redirectToIfDisabled: string | null;

    /**
     * The value returned by the guard when no feature flags are defined for a route.
     *
     * @default false
     *
     * @remarks
     * If this property is set to `true`, the guard will allow access to routes that don't have any
     * feature flags defined in their `data` property. If set to `false`, the guard will deny access to
     * such routes.
     */
    validIfNone: boolean;
  };
}

export type NgxFlagrPartialConfig = Partial<NgxFlagrConfiguration> &
  Pick<NgxFlagrConfiguration, 'featureFlagService'>;

export type NgxFlagrOptions =
  | NgxFlagrPartialConfig
  | (() => NgxFlagrPartialConfig);

export function createConfiguration(
  optionsInput: NgxFlagrOptions
): NgxFlagrConfiguration {
  const DEFAULT_CONFIGURATION: Omit<
    NgxFlagrConfiguration,
    'featureFlagService'
  > = {
    routing: {
      keys: {
        featureFlag: 'featureFlag',
        redirectToIfDisabled: 'redirectToIfDisabled',
      },
      redirectToIfDisabled: null,
      validIfNone: false,
    },
  };

  const options =
    typeof optionsInput === 'function' ? optionsInput() : optionsInput;

  const configuration = Object.assign({}, DEFAULT_CONFIGURATION, options);
  return configuration;
}
