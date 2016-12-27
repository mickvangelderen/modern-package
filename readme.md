This readme is for package developers. Package users should [look here](source/). 

# Organization

The source code for this package lives in [`source/`](source/). The package is built to the `build/` directory which is ignored by git. This architecture allows:

1. Having an identical file structure between the source and build.
1. Having different build and test dependencies. 
1. Building multiple versions of the package for specific Node.js environments or the browser. While the architecture supports this, it has not been implemented for this package.

# Testing

Its code can be tested during development without building the package. A continuous integration service builds and tests the built version of the package. 

# Building

The package consists of a number of resources which are transpiled, transformed and copied. 

## JavaScript

Modern JavaScript is transpiled using [Babel](https://babeljs.io/).

## package.json

The `scripts` and `private` properties are removed. The `devDependencies` matching `/^babel-/` are removed. 

## readme.md, .npmignore

These files are simply copied.

# Publishing

To publish a new version of this package you need to update its version, build it and publish it. This procedure is usually done with the following commands.

```bash
cd source/
npm version patch
cd ..
git push
# *Check if continuous integration builds succeed.*
npm run build
cd build/
npm publish
```

