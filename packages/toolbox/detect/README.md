# @fiad/toolbox/detect

A simple collector of device info based on [ua-parser-js](https://github.com/faisalman/ua-parser-js) and [ismobilejs](https://github.com/kaimallea/isMobile)

---

## Get started

```sh
npm i @fiad/toolbox
```

```js
import { browser, engine, mobile, os, touch } from '@fiad/toolbox/detect'

if (touch && mobile.phone.any) {
  // scoped code for smartphones
}

if (browser.name === 'Chrome' && os.name === 'Mac OS') {
  // scoped code for Chrome on Mac OS
}

if (browser.name === 'Edge' && (browser.major <= 18 || engine.name === 'Blink')) {
  // scoped code for pre-chromium Edge
}
```

Please check out [ua-parser-js](https://github.com/faisalman/ua-parser-js) and [ismobilejs](https://github.com/kaimallea/isMobile) documentations for more details on the *browser*, *engine*, *os* and *mobile* objects.
