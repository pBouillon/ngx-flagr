import { ModuleWithProviders, NgModule } from '@angular/core';

import { NgxFlagrRoutingOptions } from './config';
import { provideNgxFlagrRouting } from './provide-routing';

/**
 * Module to configure the routing utilities of `@ngx-flagr/routing`
 *
 * Use the static `forRoot` method to provide the configuration options for the
 * guard
 *
 * @example
 * ```
 * imports: [
 *   NgxFlagrRoutingModule.forRoot(),
 * ]
 * ```
 */
@NgModule({})
export class NgxFlagrRoutingModule {
  static forRoot(
    options?: NgxFlagrRoutingOptions
  ): ModuleWithProviders<NgxFlagrRoutingModule> {
    return {
      ngModule: NgxFlagrRoutingModule,
      providers: [provideNgxFlagrRouting(options)],
    };
  }
}
