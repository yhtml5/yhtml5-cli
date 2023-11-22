process.env.NODE_ENV = 'production'
const ora = require('ora');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config.lib');

var spinner = ora('building libs...');
spinner.start();

webpack(webpackConfig, function (err, stats) {
  spinner.stop();
  if (err) {
    process.stdout.write(err.message + '\n\n');
    process.stdout.write('build faild\n');
    process.exit(1);
  };
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n');
});
