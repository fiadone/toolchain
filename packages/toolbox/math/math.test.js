import { map, clamp, lerp } from '@fiad/toolbox/math'

test('It should map the value across the two given ranges', () => {
  const result = map(8, [6, 10], [18, 30])
  expect(result).toBe(24)
})

test('It should map the value across the two given values', () => {
  const result = map(5, 10, 100)
  expect(result).toBe(50)
})

test('It should clamp the value across the two given bounds', () => {
  const result = clamp(2, 0, 1)
  expect(result).toBe(1)
})

test('It should return the linear interpolant between the two given values (with default factor)', () => {
  const result = lerp(0, 10)
  expect(result).toBe(10)
})

test('It should return the linear interpolant between the two given values (with custom factor)', () => {
  const result = lerp(0, 10, 0.5)
  expect(result).toBe(5)
})
