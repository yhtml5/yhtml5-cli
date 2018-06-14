/**
* Copyright (c) 2015-present, yhtml5.com, Inc.
* All rights reserved.
*/
var notRepeat = (function () {
'use strict';

let awaitStatus = true;
const timer = (time) => new Promise((resolve) => setTimeout(resolve, time));

const notRepeat = (time = 1000) =>
  new Promise((resolve, reject) => {
    if (awaitStatus) {
      awaitStatus = false;
      resolve();
      timer(time)
        .then(() => { awaitStatus = true; });
    } else {
      reject('Do not repeat!');
    }
  });

return notRepeat;

}());
