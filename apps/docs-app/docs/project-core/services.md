---
sidebar_position: 1
description: The  FeatureFlagService is a service responsible for retrieving feature flag
---

# Services

## `FeatureFlagService`

The  `FeatureFlagService` is a service responsible for retrieving feature flag
information. It provides a way for its consumer to check whether a feature flag
is enabled or not.

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
