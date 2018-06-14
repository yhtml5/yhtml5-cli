(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.parseUrl = {})));
}(this, (function (exports) { 'use strict';

// 存在url 有俩个相同的key 会取第一个
function queryUrlParam(key, url) {
  var value = location.search.match(new RegExp("[\?\&]" + key + "=([^\&]*)(\&?)", "i"));
  return value ? value[1] : ""
}

function parseUrlToObject(url) {
  if (!url) { return '' }
  const reg = /([^#?&]*)=([^&#]*)/g;
  const args = url;
  const query = {};
  let re = reg.exec(args);
  while (re) {
    query[re[1]] = re[2];
    re = reg.exec(args);
  }
  return query;
}

function parseObjectToUrl(obj) {
  if (Object.prototype.toString.call(obj) !== '[object Object]') { return '' }
  return Object.entries(obj).map(([key, val]) => {
    const type = Object.prototype.toString.call(val);
    return (type === '[object String]' || type === '[object Number]' || type === '[object Boolean]')
      ? `${key}=${val}` : ''
  }).join('&')
}

exports.queryUrlParam = queryUrlParam;
exports.parseUrlToObject = parseUrlToObject;
exports.parseObjectToUrl = parseObjectToUrl;

Object.defineProperty(exports, '__esModule', { value: true });

})));
