import { memoize } from '@fiad/toolbox/cache'

test('It should throw an error because the given argument is not a function', () => {
  expect(() => memoize('not a function')).toThrow()
})

describe('Function memoization', () => {
  const fn = jest.fn(x => x * x)
  const memoFn = memoize(fn)

  test('It should execute the function because of missing cached result', () => {
    const result = memoFn(10)
    expect(result).toBe(100)
    expect(fn).toBeCalledTimes(1)
  })

  test('It should skip the execution of the function and return the cached result directly', () => {
    const result = memoFn(10)
    expect(result).toBe(100)
    expect(fn).toBeCalledTimes(1)
  })
})
