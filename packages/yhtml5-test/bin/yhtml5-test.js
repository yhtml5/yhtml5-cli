#!/usr/bin/env node
/**
 * Author: yhtml5
 *
 */

'use strict';

const spawn = require('cross-spawn');
const { clearConsole } = require('yhtml5-dev-utils')
const args = process.argv.slice(2);
const paths = require('../utils/paths');

clearConsole()

const scriptIndex = args.findIndex(x =>
  x === 'build' || x === 'eject' || x === 'start' || x === 'test');
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

const result = spawn.sync(
  'node',
  nodeArgs
    .concat(require.resolve('../scripts/test'))
    .concat(args.slice(scriptIndex + 1)),
  { stdio: 'inherit' }
);

paths.isBeforePublish && console.log('\nyhtml5-test.js', {
  args: args,
  scriptIndex: scriptIndex,
  script: script,
  nodeArgs: nodeArgs
    .concat(require.resolve('../scripts/test'))
    .concat(args.slice(scriptIndex + 1)),
  result: result.signal
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


// switch (script) {
//   case 'test': {
//     const result = spawn.sync(
//       'node',
//       nodeArgs
//         .concat(require.resolve('../scripts/' + script))
//         .concat(args.slice(scriptIndex + 1)),
//       { stdio: 'inherit' }
//     );
//     if (result.signal) {
//       if (result.signal === 'SIGKILL') {
//         console.log(
//           'The build failed because the process exited too early. ' +
//           'This probably means the system ran out of memory or someone called ' +
//           '`kill -9` on the process.'
//         );
//       } else if (result.signal === 'SIGTERM') {
//         console.log(
//           'The build failed because the process exited too early. ' +
//           'Someone might have called `kill` or `killall`, or the system could ' +
//           'be shutting down.'
//         );
//       }
//       process.exit(1);
//     }
//     process.exit(result.status);
//     break;
//   }
//   default:
//     console.log('Unknown script "' + script + '".');
//     console.log('Perhaps you need to update react-scripts?');
//     console.log(
//       'See: https://github.com/yhtml5/YHTML5-CLI'
//     );
//     break;
// }




