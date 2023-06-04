import { ModuleWithProviders, NgModule } from '@angular/core';

import { NgxFlagrOptions } from './config';
import { FeatureFlagDirective } from './feature-flag.directive';
import { provideNgxFlagr } from './provide-core';

/**
 * The main module for configuring and providing the `ngx-flagr`
 *
 * Use the static `forRoot` method to provide the directives and services
 * associated with this library
 *
 * @example
 * ```
 * imports: [
 *   NgxFlagrModule.forRoot({
 *     featureFlagService: CustomFeatureFlagService,
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
