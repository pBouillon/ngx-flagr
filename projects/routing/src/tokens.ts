import { InjectionToken } from '@angular/core';

import {
  NgxFlagrPartialRoutingConfig,
  NgxFlagrRoutingConfiguration,
} from './config';

export const INITIAL_CONFIGURATION = new InjectionToken<
  NgxFlagrPartialRoutingConfig | undefined
>('@ngx-flagr/routing initial configuration');

export const CONFIGURATION = new InjectionToken<NgxFlagrRoutingConfiguration>(
  '@ngx-flagr/routing configuration'
);
