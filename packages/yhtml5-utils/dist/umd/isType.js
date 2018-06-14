(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.isType = {})));
}(this, (function (exports) { 'use strict';

/**
 *  reference: https://github.com/lodash/lodash
 */

const isUndefined = (value) => typeof value === 'undefined';
const isFalse = ((value) => Object.prototype.toString.call(value) === '[object Boolean]' && !value) ? false : true;
const isNull = (value) => Object.prototype.toString.call(value) === '[object Null]';
const isNumber = (value) => Object.prototype.toString.call(value) === '[object Number]';
const isString = (value) => Object.prototype.toString.call(value) === '[object String]';
const isStringEmpty = (value) => Object.prototype.toString.call(value) === '[object String]' && value === '';
const isStringNotEmpty = (value) => Object.prototype.toString.call(value) === '[object String]' && value !== '';
const isFunction = (value) => Object.prototype.toString.call(value) === '[object Function]';
const isArray = (value) => Object.prototype.toString.call(value) === '[object Array]';
const isArrayEmpty = (value) => Array.isArray(value) && value.length === 0;
const isArrayNotEmpty = (value) => Array.isArray(value) && value.length > 0;
const isObject = (value) => Object.prototype.toString.call(value) === '[object Object]';
const isObjectEmpty = (value) => Object.prototype.isPrototypeOf(value) === '[object Object]' && Object.keys(value).length === 0;

exports.isNull = isNull;
exports.isFalse = isFalse;
exports.isUndefined = isUndefined;
exports.isNumber = isNumber;
exports.isFunction = isFunction;
exports.isArray = isArray;
exports.isArrayEmpty = isArrayEmpty;
exports.isArrayNotEmpty = isArrayNotEmpty;
exports.isString = isString;
exports.isStringEmpty = isStringEmpty;
exports.isStringNotEmpty = isStringNotEmpty;
exports.isObject = isObject;
exports.isObjectEmpty = isObjectEmpty;

Object.defineProperty(exports, '__esModule', { value: true });

})));
