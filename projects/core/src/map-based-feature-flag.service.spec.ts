import { MapBasedFeatureFlagService } from './map-based-feature-flag.service';

import { FeatureFlagEvaluationResult } from './feature-flag';

describe('MapBasedFeatureFlagService', () => {
  let featureFlagService: MapBasedFeatureFlagService;

  const featureFlagsData: Record<string, FeatureFlagEvaluationResult> = {
    feature1: true,
    feature2: false,
    feature3: Promise.resolve(true),
  };

  beforeEach(() => {
    featureFlagService = new MapBasedFeatureFlagService(featureFlagsData);
  });

  it('should be created', () => {
    expect(featureFlagService).toBeTruthy();
  });

  it('should return the correct feature flag value', () => {
    expect(featureFlagService.isEnabled('feature1')).toEqual(true);
    expect(featureFlagService.isEnabled('feature2')).toEqual(false);
    expect(featureFlagService.isEnabled('feature3')).toBeInstanceOf(Promise);
  });

  it('should return false for unknown feature flags', () => {
    expect(featureFlagService.isEnabled('unknownFeature')).toEqual(false);
  });
});
