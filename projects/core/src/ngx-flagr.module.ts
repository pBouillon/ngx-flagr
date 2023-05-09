import { ModuleWithProviders, NgModule } from '@angular/core';

import { NgxFlagrOptions } from './config';
import { FeatureFlagDirective } from './feature-flag.directive';
import { provideNgxFlagr } from './provide-ngx-flagr';

/**
 * The main module for configuring and providing the `ngx-flagr`
 *
 * Use the static `forRoot` method to provide the configuration options for the
 * guard. This method also provides the directives and services associated with
 * this library.
 *
 * @example
 * ```
 * imports: [
 *   FeatureFlagModule.forRoot({
 *       featureFlagService: CustomFeatureFlagService,
 *     },
 *   }),
 * ]
 * ```
 */
@NgModule({
  imports: [FeatureFlagDirective],
  exports: [FeatureFlagDirective],
})
export class NgxFlagrModule {
  static forRoot(
    options: NgxFlagrOptions
  ): ModuleWithProviders<NgxFlagrModule> {
    return {
      ngModule: NgxFlagrModule,
      providers: [provideNgxFlagr(options)],
    };
  }
}
