import { formatNumber, isArrayNotEmpty, circular } from '../src/utils/index';

describe('function.test', function () {
  it('util.validator.isArrayNotEmpty', () => {
    const values1 = [null, NaN, 1, '1', {}, [], () => { }]
    const values2 = [[1], [{}, []]]

    values1.forEach((value) => expect(isArrayNotEmpty(value)).toEqual(false))
    values2.forEach((value) => expect(isArrayNotEmpty(value)).toEqual(true))
  })

  it('util.validator.formatNumber', () => {
    const value = 999999.715001
    const a = new formatNumber({
      decimals: 2,
      decPoint: '.',
      thousandsSep: ',',
      roundtag: 'round'
    })
    const b = new formatNumber({
      decimals: 3,
      decPoint: '.',
      roundtag: 'ceil'
    })
    const c = new formatNumber()
    const d = new formatNumber({
      decimals: 3,
      decPoint: '.',
      roundtag: 'ceil',
      beforeTransform(value) {
        return value / 100
      }
    })

    const cases = [{
      input: a(value),
      output: '999,999.72'
    }, {
      input: b(value),
      output: '999999.716'
    }, {
      input: c(value),
      output: '1000000'
    }, {
      input: d(value),
      output: '9999.998'
      // }, {
      //   input: e(value),
      //   output: '9999.998'
    }]

    const errorCases = [{
      input() {
        return new formatNumber({
          decimals: 'dddd',
        })
      },
      output: 'decimals'
    }, {
      input() {
        return new formatNumber({
          beforeTransform: 'dddd',
        })
      },
      output: 'beforeTransform'
    }]

    cases.forEach((value, index) => expect((value.input)).toEqual(value.output))

    errorCases.forEach((value, index) => expect(value.input).toThrow(value.output))
  })

})





