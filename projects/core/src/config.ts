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
  > = {};

  const options =
    typeof optionsInput === 'function' ? optionsInput() : optionsInput;

  const configuration = Object.assign({}, DEFAULT_CONFIGURATION, options);
  return configuration;
}
