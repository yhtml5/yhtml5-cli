/**
 * formatNumber
 * params description：
 * @param {number} number                 要格式化的数字
 * @param {function} beforeTransform      转换前处理, 例: 分=>元
 * @param {number} decimals               保留几位小数, 默认 0
 * @param {number} util                   多少位开启换单位, 默认 万
 * @param {string} roundtag               舍入参数, [ceil: 向上取整, floor: 向下取整, round: 四舍五入], 默认 round
 * @param {string} decPoint               小数点符号, 默认 '.'
 * @param {string} thousandsSep           千分位符号, 默认 无
 */

function formatNumber(values) {
  const { decimals = 0, util, decPoint = '.', thousandsSep, roundtag = 'round', beforeTransform } = values || {}
  if (process.env.NODE_ENV !== 'production') {
    if (Object.prototype.toString.call(decimals) !== '[object Number]') {
      throw `formatNumber\'s parameter decimals must be a Number, but get ${decimals}`
      return
    }
    if (!(roundtag === 'ceil' || roundtag === 'floor' || roundtag === 'round')) {
      throw `formatNumber\'s parameter roundtag can only be one of the [ceil,floor,round] or be Omitted, but get ${roundtag}`
      return
    }
    if (Object.prototype.toString.call(beforeTransform) === '[object Function]') {
      try {
        beforeTransform(100)
      } catch (error) {
        throw `the function beforeTransform has error \n ${error}`
      }
    } else if (beforeTransform) {
      throw `formatNumber\'s parameter beforeTransform must be a function, but get ${beforeTransform}`
    }
  }

  return (number) => {
    if (beforeTransform) {
      number = beforeTransform(number)
    }
    // let number = JSON.parse(JSON.stringify(value))
    number = (number + '').replace(/[^0-9+-Ee.]/g, '')
    let n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      s = '',
      toFixedFix = function (n, prec) {
        const k = Math.pow(10, prec);
        console.log();
        return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)) / k;
      };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (thousandsSep) {
      const re = /(-?\d+)(\d{3})/;
      while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + thousandsSep + "$2");
      }
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(decPoint);
  }
}

// const value = 999999.715001
// const a = new formatNumber({
//     decimals: 2,
//     decPoint: '.',
//     thousandsSep: null,
//     roundtag: 'round'
// })
// const b = new formatNumber({
//     decimals: 3,
//     decPoint: '.',
//     roundtag: 'ceil'
// })
// const c = new formatNumber()
// const d = new formatNumber({
//     decimals: 3,
//     decPoint: '.',
//     roundtag: 'ceil',
//     beforeTransform(value) {
//         return value / 100
//     }
// })

// a(value)         // 999,999.72
// b(value)         // 999999.716
// c(value)         // 1000000
// d(value)         // 9999.998
// e(value)         // 100万

export default formatNumber

