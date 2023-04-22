import { TestBed } from '@angular/core/testing';
import { Route } from '@angular/router';

import { of } from 'rxjs';

import { FeatureFlagPreloadingStrategy } from './feature-flag-preloading-strategy';
import { FeatureFlagService } from './feature-flag.service';
import { CONFIGURATION, FEATURE_FLAG_SERVICE } from './tokens';

describe(FeatureFlagPreloadingStrategy.name, () => {
  let featureFlagServiceMock: jasmine.SpyObj<FeatureFlagService>;

  beforeEach(() => {
    featureFlagServiceMock = jasmine.createSpyObj<FeatureFlagService>(
      'FeatureFlagService',
      ['isEnabled']
    );

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
    });
  });

  describe('with Promise<boolean>', () => {
    it('preloads the route if the feature flag is enabled', () => {
      const route: Route = { data: { featureFlag: 'valid' } };
      const load = jasmine.createSpy('load').and.returnValue(of(true));

      featureFlagServiceMock.isEnabled.and.returnValue(Promise.resolve(true));

      TestBed.runInInjectionContext(() => {
        TestBed.inject(FeatureFlagPreloadingStrategy)
          .preload(route, load)
          .subscribe({
            complete: () => expect(load).toHaveBeenCalled(),
          });
      });
    });

    it('does not preload the route if the feature flag is disabled', () => {
      const route: Route = { data: { featureFlag: 'invalid' } };
      const load = jasmine.createSpy('load').and.returnValue(of(true));

      featureFlagServiceMock.isEnabled.and.returnValue(Promise.resolve(false));

      TestBed.runInInjectionContext(() => {
        TestBed.inject(FeatureFlagPreloadingStrategy)
          .preload(route, load)
          .subscribe({
            complete: () => expect(load).not.toHaveBeenCalled(),
          });
      });
    });
  });

  describe('with Observable<boolean>', () => {
    it('preloads the route if the feature flag is enabled', () => {
      const route: Route = { data: { featureFlag: 'valid' } };
      const load = jasmine.createSpy('load').and.returnValue(of(true));

      featureFlagServiceMock.isEnabled.and.returnValue(of(true));

      TestBed.runInInjectionContext(() => {
        TestBed.inject(FeatureFlagPreloadingStrategy)
          .preload(route, load)
          .subscribe({
            complete: () => expect(load).toHaveBeenCalled(),
          });
      });
    });

    it('does not preload the route if the feature flag is disabled', () => {
      const route: Route = { data: { featureFlag: 'invalid' } };
      const load = jasmine.createSpy('load').and.returnValue(of(true));

      featureFlagServiceMock.isEnabled.and.returnValue(of(false));

      TestBed.runInInjectionContext(() => {
        TestBed.inject(FeatureFlagPreloadingStrategy)
          .preload(route, load)
          .subscribe({
            complete: () => expect(load).not.toHaveBeenCalled(),
          });
      });
    });
  });

  describe('boolean', () => {
    it('preloads the route if the feature flag is enabled', () => {
      const route: Route = { data: { featureFlag: 'valid' } };
      const load = jasmine.createSpy('load').and.returnValue(of(true));

      featureFlagServiceMock.isEnabled.and.returnValue(true);

      TestBed.runInInjectionContext(() => {
        TestBed.inject(FeatureFlagPreloadingStrategy)
          .preload(route, load)
          .subscribe({
            complete: () => expect(load).toHaveBeenCalled(),
          });
      });
    });

    it('does not preload the route if the feature flag is disabled', () => {
      const route: Route = { data: { featureFlag: 'invalid' } };
      const load = jasmine.createSpy('load').and.returnValue(of(true));

      featureFlagServiceMock.isEnabled.and.returnValue(false);

      TestBed.runInInjectionContext(() => {
        TestBed.inject(FeatureFlagPreloadingStrategy)
          .preload(route, load)
          .subscribe({
            complete: () => expect(load).not.toHaveBeenCalled(),
          });
      });
    });
  });

  it('throws an error if an invalid feature flag is provided', () => {
    const route: Route = { data: { featureFlag: 5 } };
    const load = jasmine.createSpy('load').and.returnValue(of(true));

    TestBed.runInInjectionContext(() => {
      expect(() =>
        TestBed.inject(FeatureFlagPreloadingStrategy).preload(route, load)
      ).toThrowError(/has an invalid feature flag: 5/);
    });
  });

  it('preloads the route if no feature flag is provided but is configured to let it through', () => {
    const route: Route = { data: {} };
    const load = jasmine.createSpy('load').and.returnValue(of(true));

    featureFlagServiceMock.isEnabled.and.returnValue(true);

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
      TestBed.inject(FeatureFlagPreloadingStrategy).preload(route, load);

      expect(load).toHaveBeenCalled();
    });
  });
});
