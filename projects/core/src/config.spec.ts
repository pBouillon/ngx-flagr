import { createConfiguration, NgxFlagrOptions } from './config';
import { FeatureFlagService } from './feature-flag.service';

class TestService implements FeatureFlagService {
  isEnabled(): boolean {
    return false;
  }
}

describe('createConfiguration', () => {
  let options: NgxFlagrOptions;

  it('creates default options with only a feature flag service', () => {
    options = {
      featureFlagService: TestService,
    };

    expect(createConfiguration(options)).toEqual({
      featureFlagService: TestService,
    });
  });

  it('creates default options with only a factory for the feature flag service', () => {
    const factory = () => TestService;

    options = {
      featureFlagService: factory,
    };

    expect(createConfiguration(options)).toEqual({
      featureFlagService: factory,
    });
  });

  it('creates options that contain passed in options', () => {
    options = {
      featureFlagService: TestService,
    };

    expect(createConfiguration(options)).toEqual({
      featureFlagService: TestService,
    });
  });
});
