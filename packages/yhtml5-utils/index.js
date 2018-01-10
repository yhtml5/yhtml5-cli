import { isNull, isFalse, isUndefined, isNumber, isFunction, isArray, isArrayEmpty, isArrayNotEmpty, isString, isStringEmpty, isStringNotEmpty, isObject, isObjectEmpty } from './src/isType';
import { setCookie, getCookie, clearCookie } from './src/cookie';
import downLoad from './src/download';
import notRepeat from './src/notRepeat';
import { parseUrlToObject, parseObjectToUrl } from './src/parseUrl';
import formatNumber from './src/formatNumber';
import author from './src/author';
import { createScript, createScriptAsync } from './src/createScript';

export default {
  // isType
  isNull,
  isFalse,
  isUndefined,
  isNumber,
  isFunction,
  isArray,
  isArrayEmpty,
  isArrayNotEmpty,
  isString,
  isStringEmpty,
  isStringNotEmpty,
  isObject,
  isObjectEmpty,
  // cookie
  setCookie,
  getCookie,
  clearCookie,
  parseUrlToObject,
  parseObjectToUrl,
  downLoad,
  notRepeat,
  formatNumber,
  author,
  createScript,
  createScriptAsync
}
