import { TestBed } from '@angular/core/testing';
import { Route, UrlTree } from '@angular/router';

import { canMatchFeatureFlag } from './feature-flag.can-match.guard';
import { FeatureFlagService } from './feature-flag.service';
import { CONFIGURATION, FEATURE_FLAG_SERVICE } from './tokens';

describe('canMatchFeatureFlag', () => {
  let featureFlagServiceMock: jasmine.SpyObj<FeatureFlagService>;

  beforeEach(() => {
    featureFlagServiceMock = jasmine.createSpyObj<FeatureFlagService>(
      'FeatureFlagService',
      ['isEnabled']
    );
  });

  it('reject invalid feature flags', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FEATURE_FLAG_SERVICE, useValue: featureFlagServiceMock },
        {
          provide: CONFIGURATION,
          useValue: {
            routing: {
              keys: { featureFlag: 'featureFlag' },
            },
          },
        },
      ],
    }).runInInjectionContext(() => {
      const route: Route = { path: 'my-route', data: { featureFlag: 1337 } };
      expect(() => canMatchFeatureFlag(route, [])).toThrowError(
        'Route my-route has an invalid feature flag: 1337'
      );
    });
  });

  it('reject navigation if the feature flag is not enabled', () => {
    featureFlagServiceMock.isEnabled.and.returnValue(false);

    TestBed.configureTestingModule({
      providers: [
        { provide: FEATURE_FLAG_SERVICE, useValue: featureFlagServiceMock },
        {
          provide: CONFIGURATION,
          useValue: {
            routing: {
              keys: { featureFlag: 'featureFlag' },
            },
          },
        },
      ],
    }).runInInjectionContext(() => {
      const result = canMatchFeatureFlag(
        { data: { featureFlag: 'not-valid' } },
        []
      );

      expect(result).toBeFalse();
    });
  });

  it('reject navigation if no feature flag is provided', () => {
    featureFlagServiceMock.isEnabled.and.returnValue(false);

    TestBed.configureTestingModule({
      providers: [
        { provide: FEATURE_FLAG_SERVICE, useValue: featureFlagServiceMock },
        {
          provide: CONFIGURATION,
          useValue: {
            routing: {
              keys: { featureFlag: 'featureFlag' },
              validIfNone: false,
            },
          },
        },
      ],
    }).runInInjectionContext(() => {
      const result = canMatchFeatureFlag({ data: {} }, []);

      expect(result).toBeFalse();
    });
  });

  it('accept navigation if no feature flag is provided and the flag is set', () => {
    featureFlagServiceMock.isEnabled.and.returnValue(false);

    TestBed.configureTestingModule({
      providers: [
        { provide: FEATURE_FLAG_SERVICE, useValue: featureFlagServiceMock },
        {
          provide: CONFIGURATION,
          useValue: {
            routing: {
              keys: { featureFlag: 'featureFlag' },
              validIfNone: true,
            },
          },
        },
      ],
    }).runInInjectionContext(() => {
      const result = canMatchFeatureFlag({ data: {} }, []);

      expect(result).toBeTrue();
    });
  });

  it('accept navigation if the feature flag is enable', () => {
    featureFlagServiceMock.isEnabled.and.returnValue(true);

    TestBed.configureTestingModule({
      providers: [
        { provide: FEATURE_FLAG_SERVICE, useValue: featureFlagServiceMock },
        {
          provide: CONFIGURATION,
          useValue: {
            routing: {
              keys: { featureFlag: 'featureFlag' },
            },
          },
        },
      ],
    }).runInInjectionContext(() => {
      const result = canMatchFeatureFlag(
        { data: { featureFlag: 'valid' } },
        []
      );

      expect(result).toBeTrue();
    });
  });

  it('reject and redirect navigation if the feature flag is disabled', () => {
    featureFlagServiceMock.isEnabled.and.returnValue(false);

    TestBed.configureTestingModule({
      providers: [
        { provide: FEATURE_FLAG_SERVICE, useValue: featureFlagServiceMock },
        {
          provide: CONFIGURATION,
          useValue: {
            routing: {
              keys: { featureFlag: 'featureFlag' },
              redirectToIfDisabled: 'rejected',
            },
          },
        },
      ],
    }).runInInjectionContext(() => {
      const result = canMatchFeatureFlag(
        { data: { featureFlag: 'invalid' } },
        []
      );

      expect(result).toBeInstanceOf(UrlTree);
      expect(result.toString()).toBe('/rejected');
    });
  });

  it('reject and redirect navigation to the route-level route if the feature flag is disabled', () => {
    featureFlagServiceMock.isEnabled.and.returnValue(false);

    TestBed.configureTestingModule({
      providers: [
        { provide: FEATURE_FLAG_SERVICE, useValue: featureFlagServiceMock },
        {
          provide: CONFIGURATION,
          useValue: {
            routing: {
              keys: {
                featureFlag: 'featureFlag',
                redirectToIfDisabled: 'redirectToIfDisabled',
              },
              redirectToIfDisabled: 'rejected',
            },
          },
        },
      ],
    }).runInInjectionContext(() => {
      const result = canMatchFeatureFlag(
        {
          data: {
            featureFlag: 'invalid',
            redirectToIfDisabled: 'rejected-specific',
          },
        },
        []
      );

      expect(result).toBeInstanceOf(UrlTree);
      expect(result.toString()).toBe('/rejected-specific');
    });
  });
});
