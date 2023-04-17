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
   * The key used to identify feature flags in the `data` property of Angular
   * routes.
   *
   * @default 'featureFlag'
   *
   * @remarks
   * This property is used to identify which property in the `data` object of an
   * Angular route contains the feature flag for that route.
   */
  routeDataFeatureFlagKey: string;
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
    routeDataFeatureFlagKey: 'featureFlag',
  };

  const options =
    typeof optionsInput === 'function' ? optionsInput() : optionsInput;

  const configuration = Object.assign({}, DEFAULT_CONFIGURATION, options);
  return configuration;
}
