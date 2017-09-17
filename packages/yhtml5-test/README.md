## yhtml5-test

### [document][documrnt-create-react-app-test] 



### default testMatch [array<string>] 

```
'<rootDir>/src/**/__tests__/**/*.js?(x)',
'<rootDir>/src/**/?(*.)(spec|test).js?(x)',
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