import {
  Directive,
  inject,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { FeatureFlag } from './feature-flag';
import { FeatureFlagService } from './feature-flag.service';
import { FEATURE_FLAG_SERVICE } from './tokens';

/**
 * A structural directive to conditionally render content based on the status of a feature flag.
 *
 * @remarks
 *
 * This directive is used to conditionally render content based on whether a feature flag is enabled. It takes a `FeatureFlag` as input and
 * uses the {@link FeatureFlagService} to determine if the feature is enabled.
 *
 * If the feature is enabled, the content of the directive is rendered, otherwise it is not.
 *
 * Additionally, the directive supports an `else` template, which is rendered when the feature flag is disabled.
 *
 * @usageNotes
 *
 * ### With a single flag
 *
 * ```html
 * <div *featureFlag="'my-feature'">
 *   This content will only be rendered if the 'my-feature' feature flag is enabled.
 * </div>
 * ```
 *
 * ### With multiple flags
 *
 * ```html
 * <div *featureFlag="['my', 'feature']">
 *   This content will only be rendered if the '['my', 'feature']' feature flags are enabled.
 * </div>
 * ```
 *
 * ### With a fallback
 *
 * ```html
 * <div *featureFlag="'my-feature'; else disabledContent">
 *   This content will only be rendered if the 'my-feature' feature flag is enabled.
 * </div>
 *
 * <ng-template #disabledContent>
 *   This content will be rendered when the 'my-feature' feature flag is disabled.
 * </ng-template>
 * ```
 *
 * @publicApi
 */
@Directive({
  selector: '[featureFlag]',
  standalone: true,
})
export class FeatureFlagDirective implements OnInit, OnDestroy {
  /** The {@link FeatureFlag} to check */
  @Input() featureFlag!: FeatureFlag;

  /** An optional fallback template to render if the feature flag is not enabled. */
  @Input() featureFlagElse?: TemplateRef<unknown>;

  private readonly _destroyed$ = new Subject<void>();

  private readonly _featureFlagService =
    inject<FeatureFlagService>(FEATURE_FLAG_SERVICE);
  private readonly _templateRef = inject(TemplateRef<unknown>);
  private readonly _viewContainerRef = inject(ViewContainerRef);

  /**
   * Initializes the directive and renders the template based on the feature flag value.
   */
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

  /**
   * Cleans up the subject used by the directive to managed an eventual subscription
   * to {@link FeatureFlagService#isEnabled} if it is an `Observable`
   */
  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  /**
   * Renders the template based on the status of the feature flag.
   *
   * @remarks
   *
   * This method checks whether the feature flag is enabled or not. If the feature flag is enabled, it renders the template
   * by calling {@link FeatureFlagDirective#createView}.
   *
   * If the feature flag is disabled, it uses the else template provided by the user.
   *
   * @returns A `Promise` that resolves to void when the rendering is complete.
   *
   * @internal
   */
  private async renderTemplate(): Promise<void> {
    const template = (await this.isFeatureEnabled(this.featureFlag))
      ? this._templateRef
      : this.featureFlagElse;

    if (template) {
      this.createView(template);
    }
  }

  /**
   * Evaluates the feature flag using the injected {@link FeatureFlagService}.
   *
   * The evaluation of the flag is done in the injected {@link FeatureFlagService} and depends on the provided implementation.
   *
   * @param featureFlag - The feature flag to check.
   * @returns A Promise that resolves to a boolean indicating if the feature flag is enabled.
   *
   * @internal
   */
  private async isFeatureEnabled(featureFlag: FeatureFlag): Promise<boolean> {
    const isEnabled = await this._featureFlagService.isEnabled(featureFlag);

    if (typeof isEnabled === 'boolean') {
      return Promise.resolve(isEnabled);
    }

    if (isEnabled instanceof Promise) {
      return isEnabled;
    }

    return new Promise<boolean>((resolve, reject) => {
      isEnabled.pipe(takeUntil(this._destroyed$)).subscribe({
        next: value => resolve(value),
        error: error => reject(error),
        complete: () =>
          reject(
            new Error('isEnabled Observable completed without emitting a value')
          ),
      });
    });
  }

  /**
   * Creates the view to be displayed by the directive.
   *
   * @param templateRef - The template to render when the feature flag is enabled.
   *
   * @remarks
   *
   * This method creates the view of the directive with the provided template and renders it in the view container.
   * The view is what will be shown when the feature flag is enabled and the directive content is rendered.
   *
   * @internal
   */
  private createView(templateRef: TemplateRef<unknown>): void {
    this._viewContainerRef.createEmbeddedView(templateRef);
  }
}
