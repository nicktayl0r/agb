module.exports = wallaby => {
  // process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true;

  return {
    files: [
      "jest.config.js",
      "tsconfig.json",
      "package.json",
      "src/**/*.ts",
      "src/**/*.vue",
      "src/**/*.json",
      "!src/tests/jest/*.test.ts"
    ],
    filesWithNoCoverageCalculated: ["jest.config.js", "**/__mocks__/*.ts"],
    tests: ["src/tests/jest/*test.ts", "src/tests/jest/*spec.ts"],
    env: {
      type: "node",
      runner: "node"
    },
    testFramework: "jest",
    debug: true,
    preprocessors: {
      // the following is supposed to help with mock hoisting https://wallabyjs.com/docs/integration/jest.html#jest-with-typescript-and-jestmock-calls
      "**/*.js?(x)": file =>
        require("@babel/core").transform(file.content, {
          sourceMap: true,
          filename: file.path,
          presets: ["babel-preset-jest"]
        })
      // "**/*.vue": file => require("vue-jest").process(file.content, file.path)
    },
    compilers: {
      "**/*.ts": wallaby.compilers.typeScript({
        module: "CommonJs",
        target: "ES5"
      })
      // "**/*.vue": require("wallaby-vue-compiler")(
      //   wallaby.compilers.typeScript(tsConf)
      // )

      /* Note that at the moment wallaby doesn't support code coverage for TypeScript in .vue files. 
      Tests will still run ok, just script sections of .vue written in TypeScript will not be highlighted.
      https://github.com/wallabyjs/public/issues/1533
      */
    }
  };
};
