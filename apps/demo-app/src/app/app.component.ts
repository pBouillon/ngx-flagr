import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

import { FeatureFlagDirective } from 'projects/core/src';

import { featureFlagsDefinition } from './app.config';
import { HeroComponent } from './hero.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, JsonPipe, HeroComponent, FeatureFlagDirective],
  template: `
    <app-hero />

    <hr style="margin: 30px auto" />

    <section>
      <h1>Configuration</h1>

      <p>
        Running with the following feature flag definitions:
        <code>{{ featureFlagsDefinition | json }}</code>
      </p>
    </section>

    <div class="grid">
      <div>
        <h3>
          <code>Feature 1</code>
        </h3>

        <p *featureFlag="'Feature 1'">
          I'm shown because <code>Feature 1</code> is
          <span class="tag valid">enabled</span>
        </p>
      </div>

      <div>
        <h3>
          <code>Feature 2</code>
        </h3>

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
    </div>
  `,
  styles: [
    '.tag { display: inline-block; padding: 2px 8px }',
    '.valid { background-color: rgba(46, 125, 50, 0.5) }',
    '.invalid { background-color: rgba(183, 28, 28, 0.5) }',
  ],
})
export class AppComponent {
  readonly featureFlagsDefinition = featureFlagsDefinition;
}
