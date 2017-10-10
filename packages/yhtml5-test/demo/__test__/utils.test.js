import { isArrayNotEmpty } from '../src/utils'

test('util.validator.isArrayNotEmpty', () => {
  const values1 = [null, NaN, 1, '1', {}, [], () => { }]
  const values2 = [[1], [{}, []]]

  values1.forEach((value) => expect(isArrayNotEmpty(value)).toEqual(false))
  values2.forEach((value) => expect(isArrayNotEmpty(value)).toEqual(true))
})
