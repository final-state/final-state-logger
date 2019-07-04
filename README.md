[![Build Status](https://travis-ci.com/final-state/final-state-logger.svg?branch=master)](https://travis-ci.com/final-state/final-state-logger)
[![codecov.io](https://codecov.io/gh/final-state/final-state-logger/branch/master/graph/badge.svg)](https://codecov.io/gh/final-state/final-state-logger)
[![Known Vulnerabilities](https://snyk.io/test/github/final-state/final-state-logger/badge.svg)](https://snyk.io/test/github/final-state/final-state-logger)
[![minified + gzip](https://badgen.net/bundlephobia/minzip/final-state-logger@1.0.0)](https://bundlephobia.com/result?p=final-state-logger@1.0.0)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# final-state-logger

> Logger for `final-state`. (Just like `redux-logger` to `redux`)

## Installation

```bash
yarn add final-state
yarn add final-state-logger
```

You should care about the `peer dependencies` of this package. If something not installed, just install them manually.

`final-state-logger` is written in `Typescript`, so you don't need to find a type definition for it.

## Basic Example

```javascript
import { applyLogger } from 'final-state-logger';

applyLogger(store);
```

## API Reference

### function finalStateLogger(store: Store): void

Print all state changes of the passed in store instance.

## Test

This project uses [jest](https://jestjs.io/) to perform testing.

```bash
yarn test
```

## Road Map
