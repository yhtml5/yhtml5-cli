/*
 *  Enter JavaScript-style regular expression to display
 *  https://regexper.com/
 *  Write and test regular expression
 *  http://www.regexr.com/
 *  https://github.com/chriso/validator.js
 */

export const isBankCardNum = (str) => /^(\d{14}|\d{16}|\d{19})$/.test(str)
export const isChinaName = (str) => /^[\u4e00-\u9fa5]{1,10}$/.test(str)
export const isChinaPhone = (str) => /^(13[0-9]|14[5|7]|15[0-9]|18[0-9])\d{8}$/.test(str)
export const isEmail = (str) => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(str)
export const isIdCard = (str) => /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(str)
export const isNum = (str) => /^[0-9]*$/.test(str)
export const isNumSixToTwenty = (str) => /^[a-zA-Z0-9]\w{5,19}$/.test(str)

export default {
  isBankCardNum,
  isChinaName,
  isChinaPhone,
  isEmail,
  isIdCard,
  isNum,
  isNumSixToTwenty,
}
