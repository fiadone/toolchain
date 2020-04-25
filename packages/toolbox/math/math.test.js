import { map, clamp, lerp } from '@fiad/toolbox/math'

test('Should map a value between two ranges', () => {
  const result = map(8, [6, 10], [18, 30])
  expect(result).toBe(24)
})

test('Should clamp a value between two bounds', () => {
  const result = clamp(2, 0, 1)
  expect(result).toBe(1)
})

test('Should linearly interpolate two values', () => {
  const result = lerp(0, 10, 0.5)
  expect(result).toBe(5)
})