(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.notRepeat = factory());
}(this, (function () { 'use strict';

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

})));
