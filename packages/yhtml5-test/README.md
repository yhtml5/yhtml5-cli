## yhtml5-test 

A test framework for front-end projects


## Table of contents

* [Target](#target)
* [Command Line](#command-line )
* [Get Started](#get-started)
* [Write Test Cases](#write-test-cases)
* [Coverage Reporte](#coverage-reporte)
* [Problems ](#problems )

### Target

* running the code with no error
* find the code which never used
* find hidden bugs

why unit testing 

<img src="https://github.com/yhtml5/YHTML5-CLI/blob/master/packages/yhtml5-test/doc/why-unit-testing.png?raw=true">

### Command Line 

scripts|description
:---|:---
npm test | run test 
npm test src/app | only testing src/app derictory 
npm run test:c | generating coverage reportes
npm run test:u | update test framework

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

#### naming

path.module.function + description

**demo**

* welcome.base.template smoke

#### add `__tests__`  directory into module directory which you want to test, like `src/welcome/__test__`

#### Filename Conventions

*  Files with `.js` suffix in `__tests__` folders.
*  Files with `.test.js` suffix.
*  Files with `.spec.js` suffix.

We recommend to put the test files (or __tests__ folders) next to the code they are testing so that relative imports appear shorter. For example, if App.test.js and App.js are in the same folder, the test just needs to import App from './App' instead of a long relative path. Colocation also helps find tests more quickly in larger projects.

#### Initializing Test Environment

If your app uses a browser API that you need to mock in your tests or if you just need a global setup before running your tests, add a src/setupTests.js to your project. It will be automatically executed before running your tests.

add setupTests.js into testMatch directory, like `src/setupTests.js`

```
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock
```

### Write Test Cases

#### testing Components in isolation 
If you’d like to test components in isolation from the child components they render, we recommend using shallow() rendering API from Enzyme. 

#### smock test; renders without crashing

#### testing memory leak 

[leakage](https://github.com/andywer/leakage/blob/master/README.md)

It is too slow to use when necessary, because

iterate() will run the function several times, create a heap snapshot and repeat that process until there is a set of heap diffs. If a memory leak has been detected an error with some debugging information will be thrown.

#### Focusing and Excluding Tests

You can replace it() with xit() to temporarily exclude a test from being executed.
Similarly, fit() lets you focus on a specific test without running any other tests.

for more information, you can read :

[test cases](https://github.com/yhtml5/YHTML5-CLI/blob/master/packages/yhtml5-test/demo/__test__/Demo.test.js)
[jest matchers][jest-matchers]

**Test Demo**

```
import React from 'react'
import ReactDOM from 'react-dom'
import App from '../src/Container/App/index'
import { isArrayNotEmpty, circular } from '../src/utils'

// smoke test; testing renders without crashing
import { rendersWithoutCrashing } from 'yhtml5-test/case'

it('Components.App renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})
rendersWithoutCrashing('Components.App', App)

// unit test
import { shallow } from 'enzyme'

it('Components.App unit tests', () => {
  shallow(<App />)
})

it('util.validator.isArrayNotEmpty', () => {
  const values1 = [null, NaN, 1, '1', {}, [], () => { }]
  const values2 = [[1], [{}, []]]

  values1.forEach((value) => expect(isArrayNotEmpty(value)).toEqual(false))
  values2.forEach((value) => expect(isArrayNotEmpty(value)).toEqual(true))
})

// logic test; mock props to running components
import 'jest-enzyme'

const appProps = {
  title: 'Welcome to React'
}

it('Components.App has welcome', () => {
  const wrapper = shallow(<App {...appProps} />)
  const welcome = <h2>Welcome to React</h2>
  // expect(wrapper.contains(welcome)).to.equal(true)
  expect(wrapper.contains(welcome)).toEqual(true)

  // jest-enzyme
  expect(wrapper).toContainReact(welcome)
})

// leakage test
import { iterate } from 'leakage'

it('Components.App does not leak when render', () => {
  iterate(() => {
    <App />
  })
})

it('Components.App does not leak when render', () => {
  iterate(() => {
    circular()
  })
})

// Focusing and Excluding Tests
xit('Components.App xit tests', () => {
  shallow(<App />)
})

// fit('Components.App fit tests', () => {
//   shallow(<App />)
// })
```

### Coverage Reporte

[Code Coverage Analysis][coverage]

* statement coverage
* branch coverage
* line coverage
* function coverage

### Problems 

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

#### React is not defined

**solution:** Try importing React in the Components file.

#### react-addons-test-utils is an implicit dependency in order to support react@0.13-14.


[code-coverage-analysis]:http://www.bullseye.com/coverage.html
[code-coverage-analysis-cn]:http://blog.csdn.net/ffeiffei/article/details/6579280
[jest]:[http://facebook.github.io/jest/]
[jest-matchers]:[http://facebook.github.io/jest/docs/en/using-matchers.html#content]
[coverage]:http://www.bullseye.com/coverage.html
[transformignorepatterns-customization]:http://facebook.github.io/jest/docs/en/tutorial-react-native.html#transformignorepatterns-customization
[documrnt-create-react-app-test]:https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests





