import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { FeatureFlagDirective } from './feature-flag.directive';
import { NgxFlagrModule } from './ngx-flagr.module';
import { FeatureFlagService } from './feature-flag.service';
import { FEATURE_FLAG_SERVICE } from './tokens';

@Injectable()
class TestFeatureFlagService implements FeatureFlagService {
  isEnabled(): boolean {
    return true;
  }
}

describe(NgxFlagrModule.name, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxFlagrModule],
      providers: [TestFeatureFlagService],
    });
  });

  it('does not provide the FeatureFlag directive', () => {
    expect(() => TestBed.inject(FeatureFlagDirective)).toThrowError(
      /No provider for FeatureFlagDirective/
    );
  });
});

describe('NgxFlagrModule.forRoot()', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxFlagrModule.forRoot({
          featureFlagService: TestFeatureFlagService,
        }),
      ],
      providers: [TestFeatureFlagService],
    });
  });

  it('provides the FeatureFlag directive', () => {
    expect(() => TestBed.inject(FeatureFlagDirective)).not.toThrowError(
      /No provider for FeatureFlagDirective/
    );
  });

  it('provides the desired service', () => {
    expect(TestBed.inject(FEATURE_FLAG_SERVICE)).toBeInstanceOf(
      TestFeatureFlagService
    );
  });
});
