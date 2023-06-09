import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { FeatureFlagService } from './feature-flag.service';
import { provideNgxFlagr } from './provide-core';
import { FEATURE_FLAG_SERVICE } from './tokens';

@Injectable()
class TestFeatureFlagService implements FeatureFlagService {
  isEnabled(): boolean {
    return true;
  }
}

describe(provideNgxFlagr.name, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TestFeatureFlagService,
        provideNgxFlagr({
          featureFlagService: TestFeatureFlagService,
        }),
      ],
    });
  });

  it('provides the desired service', () => {
    expect(TestBed.inject(FEATURE_FLAG_SERVICE)).toBeInstanceOf(
      TestFeatureFlagService
    );
  });
});
