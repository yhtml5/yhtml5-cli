/**
 * author: yhtml5
 * reference: https://github.com/facebook/jest/blob/master/docs/ExpectAPI.md
 * description: common matcher
 */

/**** Common Matchers ****/

// toBe uses === to test exact
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

// check the value of an object, use toEqual
test('object assignment', () => {
  const data = { one: 1 };
  data['two'] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

// test for the opposite of a matcher
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});

/**** Truthiness ****/

// In tests you sometimes need to distinguish between undefined, null, and false,
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});


/**** Numbers ****/

// Most ways of comparing numbers have matcher equivalents.
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

/**
 * For floating point equality, use toBeCloseTo instead of toEqual,
 * because you don't want a test to depend on a tiny rounding error.
 */

test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  expect(value).not.toBe(0.3);    // It isn't! Because rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});

/**** Strings ****/

// You can check strings against regular expressions with toMatch:
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});


/**** Arrays ****/

// You can check if an array contains a particular item using toContain:
test('the shopping list has beer on it', () => {
  const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'beer',
  ];
  expect(shoppingList).toContain('beer');
});


/**** String ****/

function compileAndroidCode() {
  throw 'you are using the wrong JDK'
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  // expect(compileAndroidCode).toThrow(ConfigError);

  // You can also use the exact error message or a regexp
  expect(compileAndroidCode).toThrow('you are using the wrong JDK');
  expect(compileAndroidCode).toThrow(/JDK/);
});























