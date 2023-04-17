import { isFeatureFlag } from './feature-flag';

describe('isFeatureFlag', () => {
  it('should return true when passed a string', () => {
    expect(isFeatureFlag('featureName')).toBeTrue();
  });

  it('should return true when passed an array of strings', () => {
    expect(isFeatureFlag(['feature1', 'feature2'])).toBeTrue();
  });

  it('should return true when passed an empty array', () => {
    expect(isFeatureFlag([])).toBeTrue();
  });

  it('should return false when passed a number', () => {
    expect(isFeatureFlag(42)).toBeFalse();
  });

  it('should return false when passed a boolean', () => {
    expect(isFeatureFlag(true)).toBeFalse();
  });

  it('should return false when passed an object', () => {
    expect(isFeatureFlag({ featureName: true })).toBeFalse();
  });

  it('should return false when passed null', () => {
    expect(isFeatureFlag(null)).toBeFalse();
  });

  it('should return false when passed undefined', () => {
    expect(isFeatureFlag(undefined)).toBeFalse();
  });
});
