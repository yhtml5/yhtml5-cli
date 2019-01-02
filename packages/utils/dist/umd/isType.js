(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.isType = {})));
}(this, (function (exports) { 'use strict';

/**
*  reference: https://github.com/lodash/lodash
*  types: ["Array", "Boolean", "Date", "Number", "Object", "RegExp", "String", "Window", "HTMLDocument"]
*/

const isUndefined = value => typeof value === 'undefined';
const isNull = value => Object.prototype.toString.call(value) === '[object Null]';
const isNumber = value => Object.prototype.toString.call(value) === '[object Number]';
const isString = value => Object.prototype.toString.call(value) === '[object String]';
const isFunction = value => Object.prototype.toString.call(value) === '[object Function]';
const isArray = value => Object.prototype.toString.call(value) === '[object Array]';
const isArrayEmpty = value => isArray(value) && value.length === 0;
const isObject = value => Object.prototype.toString.call(value) === '[object Object]';
const isObjectEmpty = value => isObject(value) && Object.keys(value).length === 0;

exports.isUndefined = isUndefined;
exports.isNull = isNull;
exports.isNumber = isNumber;
exports.isString = isString;
exports.isFunction = isFunction;
exports.isArray = isArray;
exports.isArrayEmpty = isArrayEmpty;
exports.isObject = isObject;
exports.isObjectEmpty = isObjectEmpty;

Object.defineProperty(exports, '__esModule', { value: true });

})));
