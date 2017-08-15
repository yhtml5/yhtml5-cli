// Config.js must be in the same directory as node_moudle

const config = {
  devPort: 9991,
  analyzerPort: 9992,
  distributePort: 9993,
  pages: [{
    key: 'app',
    name: 'app.html'
  }, {
    key: 'login',
    name: 'login.html'
  }],
  entry: '/',
  output: '/',
  type: ''
}


module.define = config