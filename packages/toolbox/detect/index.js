/**
 * @module detect
 * @package @fiad/toolbox
 * @description A simple collector of device info
 */

import detect from 'ismobilejs'

const { windows, amazon, other, ...mobile } = detect(navigator.userAgent)
const touch = 'touchstart' in window

export { mobile, touch }
