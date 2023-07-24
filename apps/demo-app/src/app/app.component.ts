import { CommonModule, JsonPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';

import { FeatureFlagDirective, FEATURE_FLAG_SERVICE } from 'projects/core/src';

import { featureFlagsDefinition } from './app.config';
import { HeroComponent } from './hero.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, JsonPipe, HeroComponent, FeatureFlagDirective],
  template: `
    <app-hero />

    <hr style="margin: 30px auto" />

    <h1>Configuration</h1>

    <blockquote>
      Running with the following feature flag definitions:
      <code>{{ featureFlagsDefinition | json }}</code>
    </blockquote>

    <div class="grid">
      <!-- Directive only -->
      <div>
        <h3>
          <code>Feature 1</code>
        </h3>

        <blockquote>
          The <code>featureFlag</code> directive can conditionally render
          templates
        </blockquote>

        <p *featureFlag="'Feature 1'">
          I'm shown because <code>Feature 1</code> is
          <span class="tag valid">enabled</span>
        </p>
      </div>

      <!-- With Fallback -->
      <div>
        <h3>
          <code>Feature 2</code>
        </h3>

        <blockquote>
          A fallback template can be defined if the feature flag is evaluated to
          false
        </blockquote>

        <p *featureFlag="'Feature 2'; else feature2Disabled">
          <code class="tag valid">Feature 2</code> is
          <span class="tag valid">enabled</span>
        </p>

        <ng-template #feature2Disabled>
          <p>
            Fallback shown because <code>Feature 2</code> is
            <span class="tag invalid">disabled</span>
          </p>
        </ng-template>
      </div>

      <!-- From the logic -->
      <div>
        <h3>
          <code>{{ customFeatureFlag() }}</code>
        </h3>

        <blockquote>
          Feature flags can be evaluated dynamically from the component's logic
        </blockquote>

        <input
          type="text"
          name="customFeatureFlag"
          [value]="customFeatureFlag()"
          (input)="setFeatureFlag($event)"
        />

        <p>
          <code class="tag">{{ customFeatureFlag() }}</code> is
          <span
            class="tag"
            [ngClass]="{
            'valid': customFeatureFlagEvaluation(),
            'invalid': !customFeatureFlagEvaluation(),
          }"
            >{{ customFeatureFlagEvaluation() ? 'enabled' : 'disabled' }}</span
          >
        </p>
      </div>
    </div>
  `,
  styles: [
    '.tag { display: inline-block; padding: 2px 8px }',
    '.valid { background-color: rgba(46, 125, 50, 0.5) }',
    '.invalid { background-color: rgba(183, 28, 28, 0.5) }',
  ],
})
export class AppComponent {
  readonly #featureFlagService = inject(FEATURE_FLAG_SERVICE);

  readonly featureFlagsDefinition = featureFlagsDefinition;

  readonly customFeatureFlag = signal<string>('Feature 3');
  readonly customFeatureFlagEvaluation = computed(() =>
    this.#featureFlagService.isEnabled(this.customFeatureFlag())
  );

  setFeatureFlag(event: any): void {
    const featureFlag = event.target.value;
    this.customFeatureFlag.set(featureFlag);
  }
}
