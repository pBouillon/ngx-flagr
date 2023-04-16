import {
  Directive,
  inject,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { FeatureFlag } from './feature-flag.service';
import { FEATURE_FLAG_SERVICE } from './tokens';

@Directive({
  selector: '[featureFlag]',
  standalone: true,
})
export class FeatureFlagDirective implements OnInit {
  @Input() featureFlag!: FeatureFlag;
  @Input() featureFlagElse?: TemplateRef<unknown>;

  private readonly _featureFlagService = inject(FEATURE_FLAG_SERVICE);
  private readonly _templateRef = inject(TemplateRef<unknown>);
  private readonly _viewContainerRef = inject(ViewContainerRef);

  async ngOnInit(): Promise<void> {
    if (!this.featureFlag) {
      throw new Error('Feature flag not specified. Please provide a value.');
    }

    if (Array.isArray(this.featureFlag) && this.featureFlag.length === 0) {
      throw new Error(
        'Feature flag list is empty. Please provide at least one feature flag.'
      );
    }

    await this.renderTemplate();
  }

  private async renderTemplate(): Promise<void> {
    const template = (await this.isFeatureEnabled(this.featureFlag))
      ? this._templateRef
      : this.featureFlagElse;

    if (template) {
      this.createView(template);
    }
  }

  private async isFeatureEnabled(featureFlag: FeatureFlag): Promise<boolean> {
    const isEnabled = await this._featureFlagService.isEnabled(featureFlag);

    if (typeof isEnabled === 'boolean') {
      return isEnabled;
    }

    if (isEnabled instanceof Promise) {
      // If isEnabled is a Promise, wait for it to resolve and return the final value
      return isEnabled;
    }

    return new Promise<boolean>((resolve, reject) => {
      isEnabled.subscribe({
        next: value => resolve(value),
        error: error => reject(error),
        complete: () =>
          reject(
            new Error('isEnabled Observable completed without emitting a value')
          ),
      });
    });
  }

  private createView(templateRef: TemplateRef<unknown>): void {
    this._viewContainerRef.createEmbeddedView(templateRef);
  }
}
