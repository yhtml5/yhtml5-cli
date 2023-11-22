const isFalse = ((value) => Object.prototype.toString.call(value) === '[object Boolean]' && !value) ? false : true

it('test realy false', () => {
  const cases = [{
    input: ['', '1', 11, {}, [], NaN, null, undefined, true],
    output: true
  }, {
    input: [false],
    output: false
  }]

  cases.forEach((value, index) =>
    value.input.forEach((v, i) =>
      expect(isFalse(v)).toEqual(value.output))
  )
})
