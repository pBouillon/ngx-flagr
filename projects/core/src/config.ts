import { Type } from '@angular/core';

import { FeatureFlagService } from './feature-flag.service';

export interface NgxFlagrConfiguration {
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
