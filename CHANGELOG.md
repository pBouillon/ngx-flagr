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

## [15.0.0-beta.1] - (2023-05-09)

### Bug Fixes

- **core:** remove the `FeatureFlagDirective` from the `Provider`s array of `provideNgxFlagr`
- **core:** add the `NgxFlagrModule` to the public API

### Feature

- **core:** add `FeatureFlagPreloadingStrategy` preloading strategy based on the implementation of the `FeatureFlagService`

### Others

- **apps/docs-app:** add a [Docusaurus](https://docusaurus.io/) documentation project
- **meta:** create a [devcontainer](https://containers.dev/) to be used in [GitHub Codespaces](https://docs.github.com/codespaces)
  - - **meta:** create [a script](./scripts/publish-ngrx-flagr-core.py) to publish the `@ngx-flagr` library easily

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
