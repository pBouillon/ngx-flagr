export interface NgxFlagrRoutingConfiguration {
  keys: {
    /**
     * The key used to identify feature flags in the `data` property of Angular
     * routes.
     *
     * @default 'featureFlag'
     */
    featureFlag: string;

    /**
     * The key used to identify the route to which the user will be redirected
     * in the `data` property of Angular routes.
     *
     * @default 'redirectToIfDisabled'
     */
    redirectToIfDisabled: string;
  };

  /**
   * The name of a route to redirect to if the user does not have the feature
   * flag enabled.
   *
   * @default null
   *
   * @remarks
   * If this property is set, and the feature flag for a route is disabled,
   * the user will be redirected to the route with this name. If it is not
   * set, the user will be denied access to the route.
   */
  redirectToIfDisabled: string | null;

  /**
   * The value returned by the guard when no feature flags are defined for a route.
   *
   * @default false
   *
   * @remarks
   * If this property is set to `true`, the guard will allow access to routes that don't have any
   * feature flags defined in their `data` property. If set to `false`, the guard will deny access to
   * such routes.
   */
  validIfNone: boolean;
}

export type NgxFlagrPartialRoutingConfig =
  Partial<NgxFlagrRoutingConfiguration>;

export type NgxFlagrRoutingOptions =
  | NgxFlagrPartialRoutingConfig
  | (() => NgxFlagrPartialRoutingConfig);

export function createConfiguration(
  optionsInput?: NgxFlagrRoutingOptions
): NgxFlagrRoutingConfiguration {
  const DEFAULT_ROUTING_CONFIGURATION: Omit<
    NgxFlagrRoutingConfiguration,
    'featureFlagService'
  > = {
    keys: {
      featureFlag: 'featureFlag',
      redirectToIfDisabled: 'redirectToIfDisabled',
    },
    redirectToIfDisabled: null,
    validIfNone: false,
  };

  const options =
    typeof optionsInput === 'function' ? optionsInput() : optionsInput;

  const configuration = Object.assign(
    {},
    DEFAULT_ROUTING_CONFIGURATION,
    options
  );

  return configuration;
}
