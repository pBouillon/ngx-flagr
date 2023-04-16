# @ngx-flagr

`ngx-flagr` is an Angular library for managing feature flags.

With `ngx-flagr`, you can easily manage feature flags, target specific users or segments, and experiment with different variations of your app's features.

- [Installation](#installation)
- [Setup](#setup)
  - [Implement `FeatureFlagService`](#implement-featureflagservice)
  - [Register the service](#register-the-service)
- [Usage](#usage)
  - [`featureFlag` directive](#featureflag-directive)
    - [Examples](#examples)
      - [With a single flag](#with-a-single-flag)
      - [With multiple flags](#with-multiple-flags)
      - [With a fallback](#with-a-fallback)
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

Then, in your Angular `main.ts` file, configure the library to use this service:

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

> Note: if no implementation of the `FeatureFlagService` is provided, the library will throw an error when trying to resolve it.

## Usage

### `featureFlag` directive

The `featureFlag` directive takes a `FeatureFlag` for input that is either a `string` or a `string[]`. It then conditionally renders the content of your template based on the evaluation of the parameter by the provided `FeatureFlagService`.

#### Examples

##### With a single flag

```html
<div *featureFlag="'my-feature'">
  This content will only be rendered if the 'my-feature' feature flag is enabled.
</div>
```

##### With multiple flags

```html
<div *featureFlag="['my', 'feature']">
  This content will only be rendered if the '['my', 'feature']' feature flags are enabled.
</div>
```

##### With a fallback

```html
<div *featureFlag="'my-feature'">
  This content will only be rendered if the 'my-feature' feature flag is enabled.
</div>

<ng-template #disabledContent>
  This content will be rendered when the 'my-feature' feature flag is disabled.
</ng-template>
```

---

## License

`@ngx-flagr` and its components are under the [MIT License](./LICENSE)
