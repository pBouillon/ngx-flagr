import { ApplicationConfig } from '@angular/core';

import { provideNgxFlagr, MapBasedFeatureFlagService } from 'projects/core/src';

export const featureFlagsDefinition: Record<string, boolean> = {
  'Feature 1': true,
  'Feature 2': false,
  'Feature 3': true,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideNgxFlagr({
      featureFlagService: MapBasedFeatureFlagService.createFromEntries(
        featureFlagsDefinition
      ),
    }),
  ],
};
