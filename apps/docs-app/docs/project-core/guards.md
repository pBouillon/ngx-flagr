---
sidebar_position: 3
---

# Guards

## `canMatchFeatureFlag`

A functional guard that checks whether a route can be activated based on the
presence and value of a feature flag in the route's data object.

### Configuration

This [`CanMatchFn`](https://angular.io/api/router/CanMatchFn) relies on the
configuration provided to `ngx-flagr` on initialization under the routing key:

```ts
const options: NgxFlagrOptions = {
  // ...
  routing: {
    // The keys used to retrieve values in the `data` section of the `Route`
    keys: {
      // Where to find the feature flag in the `Route`'s `data`
      // Default value: 'featureFlag'
      featureFlag: 'featureFlag',
      // Where to find the route to redirect the user to if the feature flag is disabled
      // Default value: 'redirectToIfDisabled'
      redirectToIfDisabled: 'redirectToIfDisabled',
    },
    // The default redirection if the guard fails and no other route is defined at the route-level
    // Default value: null
    redirectToIfDisabled: null,
    // Whether the guard should let pass through routes that invokes it but without providing feature flags
    // Default value: false
    validIfNone: false,
  },
};
```

:::note Default values and behavior

```ts
routing: {
      keys: {
        featureFlag: 'featureFlag',
        redirectToIfDisabled: 'redirectToIfDisabled',
      },
      redirectToIfDisabled: null,
      validIfNone: false,
    },
```

:::

:::caution

Both `routing.keys.featureFlag` and `routing.validIfNone` are also used by the
[`FeatureFlagPreloadingStrategy`](./preloading-strategies#featureflagpreloadingstrategy)
where they serve the same purpose (resolving feature flags and the behavior to
adopt if none is found).

:::

### Usage

```ts
export const routes: Route[] = [
  {
    path: '...',
    component: CustomComponent,
    // highlight-next-line
    data: { featureFlag: 'my-feature' },
    // highlight-next-line
    canMatch: [ canMatchFeatureFlag ],
  },
];
```

:::info

In case a feature flag is not detected for a specific `Route`, and `ngx-flagr`
has been set up to exclude routes without any feature flags, a warning message
will be displayed in the console (applicable only in development mode) to notify
you which `Route` could potentially exhibit this unexpected behavior.

:::
