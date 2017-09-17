### webpack alias


### Unexpected token import

By default jest doesn't transform ES6 js code from node_modules
[solution][transformignorepatterns-customization]


**solution:** .config.js add transformIgnorePatterns: ["node_modules/(?!(yhtml5-test|my-project|react-native-button)/)"]


[transformignorepatterns-customization]:http://facebook.github.io/jest/docs/en/tutorial-react-native.html#transformignorepatterns-customization