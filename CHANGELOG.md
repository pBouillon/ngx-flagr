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

## [Unreleased]

### Others

- **meta:** Create a [devcontainer](https://containers.dev/) to be used in [GitHub Codespaces](https://docs.github.com/codespaces)

## [0.2.0] - (2023-04-19)

### Feature

- **core:** Added `NgxFlagrModule` module for configuring and providing `ngx-flagr`
- **core:** Added `forRoot` static method to `NgxFlagrModule` for providing configuration options
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
