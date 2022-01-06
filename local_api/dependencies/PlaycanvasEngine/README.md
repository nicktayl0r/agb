# PlaycanvasEngine

## Description

PlaycanvasEngine is a fork of [playcanvas/engine](https://github.com/playcanvas/engine) with modifications specific to Interactive Case development. Plus, the source for a bundle of playcanvas-scripts to enable the usage of sims states and extended sim functionality. 

## Project Structure

This project has has two main parts.

### src

The src folder contains source files of the [playcanvas/engine](https://github.com/playcanvas/engine). We've made modifications to:

- Enforce sequential loading of multiple sim instances within a Case

### extensions

"extensions" is a collection of scripts for extending the functionality of sims. Scripts for:

- Sim State Managment
- Shared Data Handling
- More Animation control and events
- Tweening
- Material and Shader Options

These scripts get bundled into a single js file and added to a Playcanvas project.

## Development

### Getting Started

Run `yarn install` from the root directory to install the required node modules.

## Building

Run any of these commands from the root directory. Will build to `dist/`

`yarn build:ext` will build the `playcanvas-scripts` bundle. `.dev` is to be used in the Playcanvas Editor. `.min` is to be used by a case

`yarn build:case` will build the `playcanvas-engine` bundle. Non-minified bundle is for running the case locally, minified is for published cases.

`yarn build-all` will build both sets of bundles.

## Publishing

1. `yarn build-all`
2. Update the version in `/dist/package.json` [appropriately](https://semver.org/)
3. `npm publish dist`
