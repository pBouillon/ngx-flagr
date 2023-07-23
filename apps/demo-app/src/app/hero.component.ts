import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `<div style="display: flex; justify-content: center">
      <img
        src="assets/ngx-flagr.png"
        alt="ngx flagr's logo"
        height="200px"
        width="200px"
      />
    </div>

    <hgroup style="text-align: center">
      <h1>ngx-flagr</h1>
      <h2>Effortless feature flag management in Angular</h2>
    </hgroup>

    <div style="display: flex; justify-content: center; gap: 15px">
      <a href="https://github.com/pBouillon/ngx-flagr" role="button">
        GitHub Repository
      </a>
      <a href="https://pbouillon.github.io/ngx-flagr" role="button">
        Read the docs 📚
      </a>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {}
