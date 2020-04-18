/**
 * @module detect
 * @package @fiad/toolbox
 * @description An helper that detects information about application's environment
 */

import detect from 'ismobilejs'

export default {
  ...detect(navigator.userAgent),
  touch: 'touchstart' in window
}
