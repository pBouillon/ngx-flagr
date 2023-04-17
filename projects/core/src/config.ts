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

  routing: {
    /**
     * The key used to identify feature flags in the `data` property of Angular
     * routes.
     *
     * @default 'featureFlag'
     *
     * @remarks
     * This property is used to identify which property in the `data` object of an
     * Angular route contains the feature flag for that route.
     */
    featureFlagKey: string;

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
      featureFlagKey: 'featureFlag',
      validIfNone: false,
    },
  };

  const options =
    typeof optionsInput === 'function' ? optionsInput() : optionsInput;

  const configuration = Object.assign({}, DEFAULT_CONFIGURATION, options);
  return configuration;
}
