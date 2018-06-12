import author from './author';
import console from './console';
import { setCookie, getCookie, clearCookie } from './cookie';
import { createScript, createScriptAsync } from './createScript';
import download from './download';
import formatNumber from './formatNumber';
import notRepeat from './notRepeat';
import version from './version';
import { queryUrlParam, parseUrlToObject, parseObjectToUrl } from './parseUrl';

import {
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
} from './isType';

export default {
  author,
  console,
  version,
  notRepeat,
  // create script
  createScript,
  createScriptAsync,
  // parse url
  queryUrlParam,
  parseUrlToObject,
  parseObjectToUrl,
  // deal cookie
  setCookie,
  getCookie,
  clearCookie,
  // isType
  isNull,
  isFalse,
  isUndefined,
  isNumber,
  formatNumber,
  isFunction,
  isArray,
  isArrayEmpty,
  isArrayNotEmpty,
  isString,
  isStringEmpty,
  isStringNotEmpty,
  isObject,
  isObjectEmpty,
}
