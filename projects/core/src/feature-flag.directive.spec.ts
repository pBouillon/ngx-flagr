import { Component, Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  FeatureFlagDirective,
  FeatureFlagService,
  FEATURE_FLAG_SERVICE,
} from '../public-api';

@Injectable()
class DummyService implements FeatureFlagService {
  isEnabled() {
    return true;
  }
}

@Component({
  template: `
    <div id="feature-enabled" *featureFlag="flag; else notEnabled">
      Feature enabled
    </div>

    <ng-template #notEnabled>
      <div id="feature-disabled">Feature not enabled</div>
    </ng-template>
  `,
})
class HostComponent {
  flag?: string | string[];
}

describe(FeatureFlagDirective.name, () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent],
      providers: [{ provide: FEATURE_FLAG_SERVICE, useClass: DummyService }],
      imports: [FeatureFlagDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
  });

  describe('OnInit', () => {
    it('should throw an error if featureFlag is not provided', async () => {
      fixture.componentInstance.flag = undefined;

      const directive: FeatureFlagDirective = fixture.debugElement
        .queryAllNodes(By.directive(FeatureFlagDirective))[0]
        .injector.get(FeatureFlagDirective);

      fixture.detectChanges();

      await expectAsync(directive.ngOnInit()).toBeRejectedWithError(
        Error,
        'Feature flag not specified. Please provide a value.'
      );
    });

    it('should not throw an error if featureFlag is provided as a string', async () => {
      fixture.componentInstance.flag = 'some flag';

      const directive: FeatureFlagDirective = fixture.debugElement
        .queryAllNodes(By.directive(FeatureFlagDirective))[0]
        .injector.get(FeatureFlagDirective);

      fixture.detectChanges();

      await expectAsync(directive.ngOnInit())
        .toBeResolved()
        .then(() => {
          expect(directive.featureFlag).toBe('some flag');
        });
    });

    it('should throw an error if featureFlag is an empty array', async () => {
      fixture.componentInstance.flag = [];

      const directive: FeatureFlagDirective = fixture.debugElement
        .queryAllNodes(By.directive(FeatureFlagDirective))[0]
        .injector.get(FeatureFlagDirective);

      fixture.detectChanges();

      await expectAsync(directive.ngOnInit()).toBeRejectedWithError(
        Error,
        'Feature flag list is empty. Please provide at least one feature flag.'
      );
    });

    it('should not throw an error if featureFlag is a non-empty array', async () => {
      fixture.componentInstance.flag = ['some', 'flag'];

      const directive: FeatureFlagDirective = fixture.debugElement
        .queryAllNodes(By.directive(FeatureFlagDirective))[0]
        .injector.get(FeatureFlagDirective);

      fixture.detectChanges();

      await expectAsync(directive.ngOnInit())
        .toBeResolved()
        .then(() => {
          expect(directive.featureFlag).toEqual(['some', 'flag']);
        });
    });
  });
});
