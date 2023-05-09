---
sidebar_position: 5
---

# Services

## `FeatureFlagService`

The  `FeatureFlagService` is a service responsible for retrieving feature flag
information. It provides a way for its consumer to check whether a feature flag
is enabled or not.

:::note

This service is used by several other parts of `@ngx-flagr/core`, including:

- The [`canMatchFeatureFlag`](./guards#canmatchfeatureflag)
- The [`FeatureFlagDirective`](./directives#featureflagdirective)
- The [`FeatureFlagPreloadingStrategy`](./preloading-strategies#featureflagpreloadingstrategy)

:::

### Methods

#### `isEnabled`

```ts
isEnabled(featureFlag: FeatureFlag): Observable<boolean> | Promise<boolean> | boolean;
```

Checks if a given feature flag is enabled.

##### Parameters

| Name          | Type          | Description                |
|:-------------:|:-------------:|:---------------------------|
| `featureFlag` | `FeatureFlag` | The feature flag to check. |

##### Returns

An `Observable`, `Promise` or `boolean` indicating if the feature flag is
enabled.
