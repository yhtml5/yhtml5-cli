/**
* Copyright (c) 2015-present, yhtml5.com, Inc.
* All rights reserved.
*/
define(['exports'], function (exports) { 'use strict';

function setCookie(name, value, hour) {
  let currentTime = new Date();
  currentTime.setTime(currentTime.getTime() + (hour * 60 * 60 * 1000));
  document.cookie = 'token=null';
  document.cookie = `${name}=${value};expires=${currentTime.toGMTString()}`;
}

const getCookie = (name) => {
  return (new RegExp(name, 'g').test(document.cookie))
    ? document.cookie.split(name)[1].split("=")[1].split(";")[0]
    : false
};
const clearCookie = (name) => {
  if (name) {
    setCookie(name, '', -1);
  } else {
    const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      keys.forEach((key) => setCookie(key, '', -1));
    }
  }
};

exports.setCookie = setCookie;
exports.getCookie = getCookie;
exports.clearCookie = clearCookie;

Object.defineProperty(exports, '__esModule', { value: true });

});
