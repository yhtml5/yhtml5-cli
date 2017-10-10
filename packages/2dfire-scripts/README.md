## yhtml5-test 

A test framework for front-end projects

### Target

* running the code with no error
* find the code which never used
* find hidden bugs

### Reference

* [jest][jest]
* [Code Coverage Analysis][code-coverage-analysis]
* [代码覆盖率分析][code-coverage-analysis-cn]

### Get Started

#### Install 2dfire-scripts using npm:

> npm install @2dfire/2dfire-scripts@latest --D 

#### add npm test script 

> "test": "clear && 2dfire-scripts test --env=jsdom",
> "test:c": "npm test -- --coverage",
> "test:u": "npm i @2dfire/2dfire-scripts@latest -D",

#### add .config.js to root directory

```#.config.js 
const config = {
  test: {
    testMatch: ['app/**/__tests__/**/*.js?(x)', 'app/**/?(*.)(spec|test).js?(x)'],
    transformIgnorePatterns: ["node_modules/(?!(yhtml5-test|my-project|react-native-button)/)"]
  }
}

module.exports = config
```

#### default config

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

#### add setupTests.js into testMatch directory, like `src/setupTests.js`

```#setupTests.js
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock
```

#### add `__tests__`  directory into module directory which you want to test, like `src/welcome/__test__`

### Write Test Cases

#### testing Components in isolation 

If you’d like to test components in isolation from the child components they render, we recommend using shallow() rendering API from Enzyme. To install it, run:

npm install --save enzyme react-test-renderer

```
import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  shallow(<App />);
});
```

#### renders without crashing

there are some common test case in @2dfire/2dfire-scripts

**test component, renders without crashing**
```
import Component from './Components';
import testCase from '@2dfire/2dfire-scripts/case'
const { rendersWithoutCrashing } = testCase

rendersWithoutCrashing('Components.HelloWorld', Component)
```

for more information, you can read [jest matchers][jest-matchers]

### naming

path.module.function + description

**demo**

* welcome.base.template smoke

### Filename Conventions

*  Files with `.js` suffix in `__tests__` folders.
*  Files with `.test.js` suffix.
*  Files with `.spec.js` suffix.

We recommend to put the test files (or __tests__ folders) next to the code they are testing so that relative imports appear shorter. For example, if App.test.js and App.js are in the same folder, the test just needs to import App from './App' instead of a long relative path. Colocation also helps find tests more quickly in larger projects.

### Initializing Test Environment

If your app uses a browser API that you need to mock in your tests or if you just need a global setup before running your tests, add a src/setupTests.js to your project. It will be automatically executed before running your tests.

add setupTests in appDir/src/setupTests.js 

```
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock
```

### coverage reporte

[Code Coverage Analysis][coverage]

* statement coverage
* branch coverage
* line coverage
* function coverage

### problems 

#### webpack alias

```# .config.js
const config = {
  test: {
    moduleNameMapper: {'^base(.*)$': path.resolve(__dirname, 'src/base$1'),}
  }
}
```

#### Unexpected token import

By default jest doesn't transform ES6 js code from node_modules
[solution][transformignorepatterns-customization]


**solution:** .config.js add transformIgnorePatterns: ["node_modules/(?!(yhtml5-test|my-project|react-native-button)/)"]

#### react-addons-test-utils is an implicit dependency in order to support react@0.13-14.


[code-coverage-analysis]:http://www.bullseye.com/coverage.html
[code-coverage-analysis-cn]:http://blog.csdn.net/ffeiffei/article/details/6579280
[jest]:[http://facebook.github.io/jest/]
[jest-matchers]:[http://facebook.github.io/jest/docs/en/using-matchers.html#content]
[coverage]:http://www.bullseye.com/coverage.html
[transformignorepatterns-customization]:http://facebook.github.io/jest/docs/en/tutorial-react-native.html#transformignorepatterns-customization
[documrnt-create-react-app-test]:https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests




