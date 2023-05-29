import { createConfiguration, NgxFlagrRoutingOptions } from './config';

describe('createConfiguration', () => {
  let options: NgxFlagrRoutingOptions;

  it('creates default options when none are specified', () => {
    options = {};

    expect(createConfiguration(options)).toEqual({
      keys: {
        featureFlag: 'featureFlag',
        redirectToIfDisabled: 'redirectToIfDisabled',
      },
      redirectToIfDisabled: null,
      validIfNone: false,
    });
  });

  it('creates options that contain passed in options', () => {
    options = {
      keys: {
        featureFlag: 'featureFlag-key',
        redirectToIfDisabled: 'unauthorized-key',
      },
      redirectToIfDisabled: 'unauthorized',
      validIfNone: true,
    };

    expect(createConfiguration(options)).toEqual({
      keys: {
        featureFlag: 'featureFlag-key',
        redirectToIfDisabled: 'unauthorized-key',
      },
      redirectToIfDisabled: 'unauthorized',
      validIfNone: true,
    });
  });
});
