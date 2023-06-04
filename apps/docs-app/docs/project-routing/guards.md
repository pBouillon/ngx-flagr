---
sidebar_position: 3
description: A functional guard that checks whether a route can be activated based on the
---

# Guards

## `canMatchFeatureFlag`

A functional guard that checks whether a route can be activated based on the
presence and value of a feature flag in the route's data object.

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
