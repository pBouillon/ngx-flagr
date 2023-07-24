<!--

## [Unreleased]

### **BREAKING CHANGES**

- ...

### Bug Fixes

- ...

### Features

- ...

### Others

- ...

-->

# Changelog

All notable changes to this project will be documented in this file.

## [16.1.0] - (2023-07-24)

### Features

- **core:** the configuration now accepts an instance or a delegate creating an
  instance of a `FeatureFlagService`
- **core:** add a `MapBasedFeatureFlagService` that can be used out of the box

### Others

- **core:** add a `FeatureFlagEvaluationResult` type to wrap the results of a
  feature flag evaluation, such as `boolean`, `Promise<boolean>`
  or `Observable<boolean>`
- **apps/demo-app:** create a demo app based on the local version of the library

## [16.0.0] - (2023-06-24)

### **BREAKING CHANGES**

- **core:** target Angular 16.0.0
- **routing:** target Angular 16.0.0

### Others

- **apps/docs-app:** add the new major version in the docs
- **meta:** fix a CI step targeting `routing` that was named `core`

## [15.0.0-beta.2] - (2023-06-04)

### **BREAKING CHANGES**

- **routing:** introduce a new `@ngx-flagr/routing` package handling routing concerns
- **core:** remove all code tackling routing concerns and move it to `@ngx-flagr/routing`

### Others

- **meta:** add a condition to run the CI only when something in `projects/` has changed
- **apps/docs-app:** showcase the contributors in a dedicated page
- **apps/docs-app:** update the documentation to reflect separation of the routing into `@ngx-flagr/routing`
- **meta:** update the publish script to publish any project of `@ngx-flagr` by passing its name as an argument

## [15.0.0-beta.1] - (2023-05-09)

### Bug Fixes

- **core:** remove the `FeatureFlagDirective` from the `Provider`s array of `provideNgxFlagr`
- **core:** add the `NgxFlagrModule` to the public API

### Feature

- **core:** add `FeatureFlagPreloadingStrategy` preloading strategy based on the implementation of the `FeatureFlagService`

### Others

- **apps/docs-app:** add a [Docusaurus](https://docusaurus.io/) documentation project
- **meta:** create a [devcontainer](https://containers.dev/) to be used in [GitHub Codespaces](https://docs.github.com/codespaces)
- **meta:** create [a script](./scripts/publish-ngrx-flagr-core.py) to publish the `@ngx-flagr` library easily

## [0.2.0] - (2023-04-19)

### Feature

- **core:** add `NgxFlagrModule` module for configuring and providing `ngx-flagr`
- **core:** add `forRoot` static method to `NgxFlagrModule` for providing configuration options
- **core:** create a functional guard `canMatchFeatureFlag`
- **core:** add the configuration of the `canMatchFeatureFlag` behavior to the `NgxFlagrConfiguration`
- **core:** update the usage of `provideNgxConfiguration` to include a default `routing` section

### Others

- **core:** move the definition of the `FeatureFlag` type into its own file
- **core:** add a method to evaluate if a value is a `FeatureFlag`
- **core:** add tests for the `provideNgxConfiguration` method

## [0.1.0] - (2023-04-16)

### Features

- **core:** create providers to initialize `@ngx-flagr/core`
- **core:** create the `FeatureFlagService` abstractions
- **core:** create the `FeatureFlagDirective`
