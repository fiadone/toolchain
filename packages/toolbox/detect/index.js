/**
 * @module detect
 * @package @fiad/toolbox
 * @description An helper that detects information about application's environment
 */

import detect from 'ismobilejs'

const { windows, amazon, other, ...mobile } = detect(navigator.userAgent)
const touch = 'touchstart' in window

export { mobile, touch }
