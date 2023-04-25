import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs';

import {
  FeatureFlag,
  FeatureFlagDirective,
  FeatureFlagService,
  FEATURE_FLAG_SERVICE,
} from '../public-api';

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
  flag?: FeatureFlag = 'some flag';
}

describe(FeatureFlagDirective.name, () => {
  let fixture: ComponentFixture<HostComponent>;
  let featureFlagServiceMock: jasmine.SpyObj<FeatureFlagService>;

  beforeEach(async () => {
    featureFlagServiceMock = jasmine.createSpyObj<FeatureFlagService>(
      'FeatureFlagService',
      {
        isEnabled: true,
      }
    );

    await TestBed.configureTestingModule({
      declarations: [HostComponent],
      providers: [
        { provide: FEATURE_FLAG_SERVICE, useValue: featureFlagServiceMock },
      ],
      imports: [FeatureFlagDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
  });

  describe('OnInit', () => {
    it('throw an error if featureFlag is not provided', async () => {
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

    it('not throw an error if featureFlag is provided as a string', async () => {
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

    it('throw an error if featureFlag is an empty array', async () => {
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

    it('not throw an error if featureFlag is a non-empty array', async () => {
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

  describe('Feature flag enabled', () => {
    describe('with boolean', () => {
      it('render the feature template', async () => {
        featureFlagServiceMock.isEnabled.and.returnValue(true);

        fixture.detectChanges();
        await fixture.whenStable();

        const featureEnabledElement = fixture.debugElement.query(
          By.css('#feature-enabled')
        );
        expect(featureEnabledElement).toBeTruthy();
      });

      it('not render the fallback template', async () => {
        featureFlagServiceMock.isEnabled.and.returnValue(true);

        fixture.detectChanges();
        await fixture.whenStable();

        const featureDisabledElement = fixture.debugElement.query(
          By.css('#feature-disabled')
        );
        expect(featureDisabledElement).toBeFalsy();
      });
    });

    describe('with Promise<boolean>', () => {
      it('render the feature template if the feature flag is enabled', async () => {
        featureFlagServiceMock.isEnabled.and.returnValue(Promise.resolve(true));

        fixture.detectChanges();
        await fixture.whenStable();

        const featureEnabledElement = fixture.debugElement.query(
          By.css('#feature-enabled')
        );
        expect(featureEnabledElement).toBeTruthy();
      });

      it('not render the fallback template', async () => {
        featureFlagServiceMock.isEnabled.and.returnValue(Promise.resolve(true));

        fixture.detectChanges();
        await fixture.whenStable();

        const featureDisabledElement = fixture.debugElement.query(
          By.css('#feature-disabled')
        );
        expect(featureDisabledElement).toBeFalsy();
      });
    });

    describe('with Observable<boolean>', () => {
      it('render the feature template if the feature flag is enabled', async () => {
        featureFlagServiceMock.isEnabled.and.returnValue(of(true));

        fixture.detectChanges();
        await fixture.whenStable();

        const featureEnabledElement = fixture.debugElement.query(
          By.css('#feature-enabled')
        );
        expect(featureEnabledElement).toBeTruthy();
      });

      it('not render the fallback template', async () => {
        featureFlagServiceMock.isEnabled.and.returnValue(of(true));

        fixture.detectChanges();
        await fixture.whenStable();

        const featureDisabledElement = fixture.debugElement.query(
          By.css('#feature-disabled')
        );
        expect(featureDisabledElement).toBeFalsy();
      });
    });
  });

  describe('Feature flag disabled', () => {
    describe('with boolean', () => {
      it('not render the feature template', async () => {
        featureFlagServiceMock.isEnabled.and.returnValue(false);

        fixture.detectChanges();
        await fixture.whenStable();

        const featureEnabledElement = fixture.debugElement.query(
          By.css('#feature-enabled')
        );
        expect(featureEnabledElement).toBeFalsy();
      });

      it('render the fallback template', async () => {
        featureFlagServiceMock.isEnabled.and.returnValue(false);

        fixture.detectChanges();
        await fixture.whenStable();

        const featureDisabledElement = fixture.debugElement.query(
          By.css('#feature-disabled')
        );
        expect(featureDisabledElement).toBeTruthy();
      });
    });

    describe('with Promise<boolean>', () => {
      it('not render the feature template', async () => {
        featureFlagServiceMock.isEnabled.and.returnValue(
          Promise.resolve(false)
        );

        fixture.detectChanges();
        await fixture.whenStable();

        const featureEnabledElement = fixture.debugElement.query(
          By.css('#feature-enabled')
        );
        expect(featureEnabledElement).toBeFalsy();
      });

      it('render the fallback template', async () => {
        featureFlagServiceMock.isEnabled.and.returnValue(
          Promise.resolve(false)
        );

        fixture.detectChanges();
        await fixture.whenStable();

        const featureDisabledElement = fixture.debugElement.query(
          By.css('#feature-disabled')
        );
        expect(featureDisabledElement).toBeTruthy();
      });
    });

    describe('with Observable<boolean>', () => {
      it('not render the feature template', async () => {
        featureFlagServiceMock.isEnabled.and.returnValue(of(false));

        fixture.detectChanges();
        await fixture.whenStable();

        const featureEnabledElement = fixture.debugElement.query(
          By.css('#feature-enabled')
        );
        expect(featureEnabledElement).toBeFalsy();
      });

      it('render the fallback template', async () => {
        featureFlagServiceMock.isEnabled.and.returnValue(of(false));

        fixture.detectChanges();
        await fixture.whenStable();

        const featureDisabledElement = fixture.debugElement.query(
          By.css('#feature-disabled')
        );
        expect(featureDisabledElement).toBeTruthy();
      });
    });
  });
});
