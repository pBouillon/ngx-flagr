# @ngx-flagr

[![CI](https://github.com/pBouillon/ngx-flagr/actions/workflows/ci.yml/badge.svg)](https://github.com/pBouillon/ngx-flagr/actions/workflows/ci.yml) [![GitHub discussions](https://img.shields.io/github/discussions/pbouillon/ngx-flagr?logo=github)](https://github.com/pbouillon/ngx-flagr/discussions) [![npm](https://img.shields.io/npm/v/@ngx-flagr/core.svg)](https://www.npmjs.com/package/@ngx-flagr/core) [![npm](https://img.shields.io/npm/dt/@ngx-flagr/core)](https://www.npmjs.com/package/@ngx-flagr/core)

> 🚩 Effortless feature flag management in Angular

With `ngx-flagr`, you can easily manage feature flags, target specific users or segments, and experiment with different variations of your app's features.

- [Installation](#installation)
- [Setup](#setup)
  - [Implement `FeatureFlagService`](#implement-featureflagservice)
  - [Register the service](#register-the-service)
- [Usage](#usage)
  - [`featureFlag` directive](#featureflag-directive)
    - [With a single flag](#with-a-single-flag)
    - [With multiple flags](#with-multiple-flags)
    - [With a fallback](#with-a-fallback)
  - [The `canMatchFeatureFlag` functional guard](#the-canmatchfeatureflag-functional-guard)
    - [Configuration](#configuration)
    - [With feature flags](#with-feature-flags)
    - [With a fallback route](#with-a-fallback-route)
    - [As a passthrough when no flags are provided](#as-a-passthrough-when-no-flags-are-provided)
    - [With a global redirection target](#with-a-global-redirection-target)
- [License](#license)

## Installation

To install `ngx-flagr`, simply run the following command:

```sh
npm i @ngx-flagr/core
```

## Setup

### Implement `FeatureFlagService`

`ngx-flagr` relies on an implementation of its `FeatureFlagService` that is up for the client to implement. This service exposes a method that allows `ngx-flagr` to evaluate whether a flag is enabled or not.

To implement this service, create an `Injectable` implementing the interface:

```ts
import { Injectable } from '@angular/core';

import { FeatureFlagService } from '@ngx-flagr/core'

@Injectable({ providedIn: 'root' })
export class CustomFeatureFlagService implements FeatureFlagService {
  // ...
}
```

### Register the service

Then, in your Angular `main.ts` file, configure the library to use this service
by calling `provideNgxFlagr` and passing in the desired options:

```ts
import { bootstrapApplication } from '@angular/platform-browser';

import { provideNgxFlagr } from '@ngx-flagr/core';

import { AppComponent } from './app/app.component';
import { FeatureFlagService } from './app/custom-feature-flag.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideNgxFlagr({ featureFlagService: CustomFeatureFlagService })
  ],
});
```

Alternatively, you can also use the `NgxFlagrModule.forRoot` static method:

```ts
import { bootstrapApplication } from '@angular/platform-browser';

import { NgxFlagrModule } from '@ngx-flagr/core';

import { AppComponent } from './app/app.component';
import { FeatureFlagService } from './app/custom-feature-flag.service';

bootstrapApplication(AppComponent, {
  providers: [
    NgxFlagrModule.forRoot({ featureFlagService: CustomFeatureFlagService })
  ],
});
```

> Note: if no implementation of the `FeatureFlagService` is provided, the library will throw an error when trying to resolve it.

## Usage

### `featureFlag` directive

The `featureFlag` directive takes a `FeatureFlag` for input that is either a `string` or a `string[]`. It then conditionally renders the content of your template based on the evaluation of the parameter by the provided `FeatureFlagService`.

#### With a single flag

```html
<div *featureFlag="'my-feature'">
  This content will only be rendered if the 'my-feature' feature flag is enabled.
</div>
```

#### With multiple flags

```html
<div *featureFlag="['my', 'feature']">
  This content will only be rendered if the '['my', 'feature']' feature flags are enabled.
</div>
```

#### With a fallback

```html
<div *featureFlag="'my-feature'; else disabledContent">
  This content will only be rendered if the 'my-feature' feature flag is enabled.
</div>

<ng-template #disabledContent>
  This content will be rendered when the 'my-feature' feature flag is disabled.
</ng-template>
```

### The `canMatchFeatureFlag` functional guard

`ngx-flagr` also provides a functional guard to control your routes resolution.

When used, it will check for the feature flags provided on the route level and
will evaluate whether they are enabled or not based on your implementation of
the `FeatureFlagService`.

Behavior can be configured within `provideNgxFlagr`.

#### Configuration

Several options are available to configure the desired behavior of the guard:

```ts
provideNgxFlagr({
  // ...

  // Optional configuration section
  routing: {
    // The keys used to retrieve values in the `data` section of the `Route`
    keys: {
      // The key where the feature flags will be defined
      featureFlag: 'featureFlag',
      // The key to the route the user will be redirected to if the guard
      // resolution fails
      redirectToIfDisabled: 'redirectToIfDisabled',
    },

    // The default redirection if the guard fails and no other route is defined
    // at the route-level
    redirectToIfDisabled: null,
    // Whether the guard should let pass through routes that invokes it but
    // without providing feature flags
    validIfNone: false,
  },
});
```

On your routes, simply provide the guard in the `canMatch` array.

#### With feature flags

```ts
const routes: Route[] = [
  {
    path: 'fast-delivery',
    component: FastDeliveryComponent,
    canMatch: canMatchFeatureFlag,
    data: { featureFlag: 'fast-delivery' }
  },
];
```

#### With a fallback route

```ts
const routes: Route[] = [
  {
    path: 'fast-delivery',
    component: FastDeliveryComponent,
    canMatch: canMatchFeatureFlag,
    data: {
      featureFlags: 'fast-delivery',
      redirectToIfDisabled: 'delivery',
    }
  },
];
```

#### As a passthrough when no flags are provided

```ts
bootstrapApplication(AppComponent, {
  providers: [
    provideNgxFlagr({
      featureFlagService: CustomFeatureFlagService,
      routing: { validIfNone: true }
    })
  ],
});

const routes: Route[] = [
  {
    path: 'fast-delivery',
    component: FastDeliveryComponent,
    canMatch: canMatchFeatureFlag,
    data: { }
  },
];
```

#### With a global redirection target

```ts
bootstrapApplication(AppComponent, {
  providers: [
    provideNgxFlagr({
      featureFlagService: CustomFeatureFlagService,
      routing: { redirectToIfDisabled: 'unauthorized' }
    })
  ],
});

const routes: Route[] = [
  {
    path: 'fast-delivery',
    component: FastDeliveryComponent,
    canMatch: canMatchFeatureFlag,
    data: { featureFlag: 'fast-delivery' }
  },
];
```

---

## License

`@ngx-flagr` and its components are under the [MIT License](./LICENSE)
