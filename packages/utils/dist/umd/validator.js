(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.validator = {})));
}(this, (function (exports) { 'use strict';

/*
 *  Enter JavaScript-style regular expression to display
 *  https://regexper.com/
 *  Write and test regular expression
 *  http://www.regexr.com/
 *  https://github.com/chriso/validator.js
 */

const isBankCardNum = str => /^(\d{14}|\d{16}|\d{19})$/.test(str);
const isChinaName = str => /^[\u4e00-\u9fa5]{1,10}$/.test(str);
const isChinaPhone = str => /^(13[0-9]|14[5|7]|15[0-9]|18[0-9])\d{8}$/.test(str);
const isEmail = str => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(str);
const isIdCard = str => /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(str);
const isNum = str => /^[0-9]*$/.test(str);
const isNumSixToTwenty = str => /^[a-zA-Z0-9]\w{5,19}$/.test(str);

exports.isBankCardNum = isBankCardNum;
exports.isChinaName = isChinaName;
exports.isChinaPhone = isChinaPhone;
exports.isEmail = isEmail;
exports.isIdCard = isIdCard;
exports.isNum = isNum;
exports.isNumSixToTwenty = isNumSixToTwenty;

Object.defineProperty(exports, '__esModule', { value: true });

})));
