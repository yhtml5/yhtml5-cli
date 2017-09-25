## yhtml5-test 

A test framework for front-end projects

### [problems](./problem.md)

### Filename Conventions

*  Files with `.js` suffix in `__tests__` folders.
*  Files with `.test.js` suffix.
*  Files with `.spec.js` suffix.

We recommend to put the test files (or __tests__ folders) next to the code they are testing so that relative imports appear shorter. For example, if App.test.js and App.js are in the same folder, the test just needs to import App from './App' instead of a long relative path. Colocation also helps find tests more quickly in larger projects.

### default config

```
const config = {
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    setupFiles: [resolve('utils/polyfills.js')],
    setupTestFrameworkScriptFile: setupTestsFile,
    testMatch: [
      `${rootDir}/src/**/__tests__/**/*.js?(x)`,
      `${rootDir}/src/**/?(*.)(spec|test).js?(x)`,
    ],
    testEnvironment: 'node',
    testURL: 'http://localhost',
    transform: {
      '^.+\\.(js|jsx)$': isEjecting
        ? `${rootDir}/node_modules/babel-jest`
        : resolve('utils/babelTransform.js'),
      '^.+\\.css$': resolve('utils/cssTransform.js'),
      '^(?!.*\\.(js|jsx|css|json)$)': resolve('utils/fileTransform.js'),
    },
    transformIgnorePatterns:['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
    moduleNameMapper: {
      '^react-native$': 'react-native-web',
    },
    moduleFileExtensions: ['web.js', 'js', 'json', 'web.jsx', 'jsx', 'node'],
  };
```

### setupTests

in appDir/src/setupTests.js 

### .config.js demo

```
const config = {
  test: {
    testMatch: ['app/**/__tests__/**/*.js?(x)', 'app/**/?(*.)(spec|test).js?(x)'],
    transformIgnorePatterns: ["node_modules/(?!(yhtml5-test|my-project|react-native-button)/)"]
  }
}

module.exports = config
```






[documrnt-create-react-app-test]:https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests




