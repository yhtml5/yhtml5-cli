## 2d-test

A test framework for front-end projects

## Table of contents
目录

* [Target](#target)
* [Command Line](#command-line )
* [Get Started](#get-started)
* [Write Test Cases](#write-test-cases)
* [Coverage Reporte](#coverage-reporte)
* [Problems ](#problems )

### Target
目的

* running the code with no error `运行代码没有错误`
* find the code which never used `找到并删除无用的历史代码`
* find hidden bugs `寻找隐藏的bug`
* Simulate a variety of input and output operation to see whether the error `模拟各种输入, 运行查看输出是否错误`

why unit testing

<img src="https://github.com/yhtml5/YHTML5-CLI/blob/master/packages/yhtml5-test/doc/why-unit-testing.png?raw=true">

测试框架解决的问题:

* 集中测试需要的第三方依赖, 统一管理版本号与升级
* 规定单元测试规范, 内置默认的测试配置,
* 引入polyfill, 模拟浏览器环境
* 引入transform, 用于转义文件
* 提供测试用例, 方便学习书写
* 提供简单的测试脚本, 不需要学习额外的babel, node, jest等知识, 快速编写测试用例

### Command Line
命令行

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

### Concept

* matcher `匹配器`
* enzyme `断言库`
* coverage report `覆盖率报告`
* snapshot testing `快照`
* view => event => action => reduce => store `组合测试`

### Get Started

#### Add test scripts to package.json

```
 "test": "2d-scripts test --env=jsdom",
 "test:c": "npm test -- --coverage",
 "test:u": "npm i @2d/2d-scripts@latest -D",
```

#### Install 2d-scripts using npm:

```
run
npm i @2d/2d-scripts@latest -D
npm i react-test-renderer@15.6.x enzyme@2.9.x jest-enzyme@3.8.x -D
```

#### add .config.js to root directory

```#.config.js
const path = require('path')
const webpackConfigAlias = {
  '^src(.*)$': path.resolve(__dirname, 'src$1'),
}

const config = {
  test: {
    testMatch: ['demo/__test__/**/*.js?(x)'],
    transformIgnorePatterns: ["node_modules/(?!(yhtml5-test|react-redux|react-native-button)/)"],
    moduleNameMapper: webpackConfigAlias,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
  }
}

module.exports = config
```

#### default config

默认配置, 内置在测试框架中

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

#### Filename Conventions (文件名约定)

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

如何书写测试用例

<a href="./demo/__test__/">Test Demo</a>

`rootDir/packages/yhtml5-test/demo/__test__/`

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

### Coverage Reporte

[Code Coverage Analysis][coverage]

语句覆盖率, 条件覆盖率, 行数覆盖率, 函数覆盖率

* statement coverage
* branch coverage
* line coverage
* function coverage

#### How to view the test report

> npm i serve -g

> serve -p 10001 ./coverage/lcov-report

### Problems

#### webpack alias

.config.js

```
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

If you are using a React below version 15.5.0, you will also need to install react-addons-test-utils.
if you use react@^15.4.2, pleasr run **npm i react-addons-test-utils@^15.4.2**

[enzyme]:http://airbnb.io/enzyme/docs/api/shallow.html
[code-coverage-analysis]:http://www.bullseye.com/coverage.html
[code-coverage-analysis-cn]:http://blog.csdn.net/ffeiffei/article/details/6579280
[jest]:http://facebook.github.io/jest/
[jest-matchers]:http://facebook.github.io/jest/docs/en/using-matchers.html#content
[coverage]:http://www.bullseye.com/coverage.html
[transformignorepatterns-customization]:http://facebook.github.io/jest/docs/en/tutorial-react-native.html#transformignorepatterns-customization
[documrnt-create-react-app-test]:https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests





