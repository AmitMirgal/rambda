const R = require('../../rambda')

test('input is null or undefined', () => {
  //These tests match Ramda behavior
  //https://ramdajs.com/repl/?v=0.25.0#?R.dissoc%28%27b%27%2C%20null%29
  expect(R.dissoc('b', null)).toEqual({})
  //https://ramdajs.com/repl/?v=0.25.0#?R.dissoc%28%27b%27%2C%20undefined%29
  expect(R.dissoc('b', undefined)).toEqual({})
})

test('property exists curried', () => {
  expect(R.dissoc('b')({
    a : 1,
    b : 2,
  })).toEqual({ a : 1 })
})

test('property doesn\'t exists', () => {
  expect(R.dissoc('c', {
    a : 1,
    b : 2,
  })).toEqual({
    a : 1,
    b : 2,
  })
})

test('works with non-string property', () => {
  expect(R.dissoc(42, {
    a  : 1,
    42 : 2,
  })).toEqual({ a : 1 })
  expect(R.dissoc(null, {
    a    : 1,
    null : 2,
  })).toEqual({ a : 1 })
  expect(R.dissoc(undefined, {
    a         : 1,
    undefined : 2,
  })).toEqual({ a : 1 })
})

test('includes prototype properties', () => {
  function Rectangle (width, height) {
    this.width = width
    this.height = height
  }
  const area = Rectangle.prototype.area = function () {
    return this.width * this.height
  }
  const rect = new Rectangle(7, 6)

  expect(
    R.dissoc('area', rect)
  ).toEqual({
    width  : 7,
    height : 6,
  })

  expect(
    R.dissoc('width', rect)
  ).toEqual({
    height : 6,
    area   : area,
  })

  expect(
    R.dissoc('depth', rect)
  ).toEqual({
    width  : 7,
    height : 6,
    area   : area,
  })
})
