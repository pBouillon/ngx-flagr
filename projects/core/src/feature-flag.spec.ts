import { isFeatureFlag } from './feature-flag';

describe('isFeatureFlag', () => {
  it('return true when passed a string', () => {
    expect(isFeatureFlag('featureName')).toBeTrue();
  });

  it('return true when passed an array of strings', () => {
    expect(isFeatureFlag(['feature1', 'feature2'])).toBeTrue();
  });

  it('return true when passed an empty array', () => {
    expect(isFeatureFlag([])).toBeTrue();
  });

  it('return false when passed a number', () => {
    expect(isFeatureFlag(42)).toBeFalse();
  });

  it('return false when passed a boolean', () => {
    expect(isFeatureFlag(true)).toBeFalse();
  });

  it('return false when passed an object', () => {
    expect(isFeatureFlag({ featureName: true })).toBeFalse();
  });

  it('return false when passed null', () => {
    expect(isFeatureFlag(null)).toBeFalse();
  });

  it('return false when passed undefined', () => {
    expect(isFeatureFlag(undefined)).toBeFalse();
  });
});
