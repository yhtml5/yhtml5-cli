const parseUrl = require('../src/parseUrl')
const { parseObjectToUrl, parseUrlToObject } = parseUrl

const testUrl = 'http://yhtml5.com?t=1&id=2&appId=3&t=4'
const testObj2 = {
  a: '',
  b: 1,
  c: '2',
  d: null,
  e: 'null',
  f: false,
  g: 'false',
  h: undefined,
  i: 'undefined',
  j: NaN,
  k: 'NaN',
  l: [],
  m: {},
  n: { a: 1 },
  o: [1],
  p: JSON.stringify([{ a: 1 }])
}

const url1 = parseObjectToUrl(testObj2)
const obj1 = parseUrlToObject(url1)

// const value = testUrl.match(new RegExp("[\?\&]" + 't' + "=([^\&]*)(\&?)", "g"));
// const value2 = value[value.length - 1].match(new RegExp("[\?\&]" + 't' + "=([^\&]*)(\&?)", "i"));
// const value2 = testUrl.match(new RegExp("[\?\&]" + 't' + "=([^\&]*)(\&?)", "i"));
// const value3 = testUrl.match(new RegExp("[\?\&]" + 'id' + "=([^\&]*)(\&?)", "g"));

console.log('done!')

// export {
//   queryUrl,
//   parseUrlToObject,
//   parseObjectToUrl
// }

