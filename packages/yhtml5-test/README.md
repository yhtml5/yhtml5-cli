## yhtml5-test

### [document][documrnt-create-react-app-test] 



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