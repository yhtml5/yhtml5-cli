const spawn = require('cross-spawn');
const { appDirectory, isBeforePublish } = require('../utils/util');

// 2dfire-scripts test --env=jsdom
const args = process.argv.slice(2);

const result = spawn.sync(
  'node',
  [].concat(require.resolve(`${appDirectory}/node_modules/yhtml5-test/scripts/test.js`))
    .concat(args),
  { stdio: 'inherit' }
);

isBeforePublish && console.log({
  args,
  appDirectory,
  isBeforePublish,
  'process.argv': process.argv,
  test: `${appDirectory}/node_modules/yhtml5-test/scripts/test.js`,
  // result,
})

if (result.signal) {
  if (result.signal === 'SIGKILL') {
    console.log(
      'The build failed because the process exited too early. ' +
      'This probably means the system ran out of memory or someone called ' +
      '`kill -9` on the process.'
    );
  } else if (result.signal === 'SIGTERM') {
    console.log(
      'The build failed because the process exited too early. ' +
      'Someone might have called `kill` or `killall`, or the system could ' +
      'be shutting down.'
    );
  }
  process.exit(1);
}
process.exit(result.status);





