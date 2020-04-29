/**
 * @module math
 * @package @fiad/toolbox
 * @description A collection of math utility functions
 */

/**
 * Maps a value across two ranges
 * @param {number} v The value to be mapped
 * @param {Array} f The range to map from
 * @param {Array|null} t The range to map to
 * @returns {number}
 * @example
 * map(50, 100, 1) = 0.5
 * map(8, [6, 10], [18, 30]) = 24
 */
export function map(v, f, t) {
  f = Array.isArray(f) ? f : [0, f]
  t = Array.isArray(t) ? t : [0, t]

  return (v - f[0]) * (t[1] - t[0]) / (f[1] - f[0]) + t[0]
}

/**
 * Clamps a value in a range
 * @param {number} v The value to be clamped
 * @param {number} min The bottom bound
 * @param {number} max The top bound
 * @returns {number}
 * @example
 * clamp(-1, 0, 1) = 0
 * clamp(2, 0, 1) = 1
 */
export function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v))
}

/**
 * Calculates the linear interpolant between two values
 * @param {number} min The bottom value
 * @param {number} max The top value
 * @param {number} r The interpolation ratio (0 to 1)
 * @returns {number}
 * @example
 * lerp(0, 100, 0.5) = 50
 */
export function lerp(min, max, r = 1) {
  return (1 - r) * min + r * max
}
