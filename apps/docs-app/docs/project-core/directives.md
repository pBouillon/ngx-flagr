---
sidebar_position: 2
---

# Directives

## `FeatureFlagDirective`

The `FeatureFlagDirective` is an Angular structural directive that can be used
to conditionally render content based on the status of a feature flag.

The directive takes a `FeatureFlag` as input and uses the `FeatureFlagService`
to determine if the feature is enabled. If the feature is enabled, the content
of the directive is rendered; otherwise, it is not.

### Usage

The `FeatureFlagDirective` is used in the template of a component to
conditionally render content based on the status of a feature flag.

The directive can be used in two ways: with a single feature flag or with
multiple feature flags.

Alternatively, both ways can also indicate a template to render if the feature
flag is not enabled.

#### With a single flag

```ts
@Component({
  selector: '...',
  standalone: true,
  imports: [FeatureFlagDirective],
  template: `
    <div *featureFlag="'my-feature'">
      'my-feature' feature flag is enabled.
    </div>
  `
})
export class MyComponent {}
```

#### With multiple flags

```ts
@Component({
  selector: '...',
  standalone: true,
  imports: [FeatureFlagDirective],
  template: `
    <div *featureFlag="['my', 'feature']">
      ['my', 'feature'] feature flags are enabled.
    </div>
  `
})
export class MyComponent {}
```

#### With a fallback

```ts
@Component({
  selector: '...',
  standalone: true,
  imports: [FeatureFlagDirective],
  template: `
    <div *featureFlag="'my-feature'; else disabledContent">
      'my-feature' feature flag is enabled.
    </div>

    <ng-template #disabledContent>
      'my-feature' feature flag is disabled.
    </ng-template>
  `
})
export class MyComponent {}
```

### Properties

#### `featureFlag`

The `featureFlag` property is an input property that specifies the feature flag
to check.

The value of this property can be either a string representing the name of the
feature flag or an array of strings representing multiple feature flags.

#### `featureFlagElse`

The `featureFlagElse` property is an optional input property that specifies a
fallback template to render if the feature flag is not enabled.

This property can be used to gracefully degrade the user experience when a
feature is not available.

### Dependencies

> *This directive does not depends on another module nor another standalone component*
