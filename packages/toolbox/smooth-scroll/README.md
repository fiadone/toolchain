# @fiad/toolbox/smooth-scroll

A dead simple and performing smooth scroll handler not affecting native scroll behaviors

---

## Get started

```sh
npm i @fiad/toolbox
```

```js
import SmoothScroll from '@fiad/toolbox/smooth-scroll'

const instance = new SmoothScroll(config)
```

__CONFIGURATION OBJECT__

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| intensity | *number* | The lerping factor used to make scroll smoother (set to 1 for linear scrolling). | *0.2* |
| onScroll | *function* | A callback to be executed when the scroll position updates. | - |

## Properties

### scrollTop

```js
const y = instance.scrollTop
```

It returns the current scroll position.

### intensity

```js
// getting property
const intensity = instance.intensity
// setting property
instance.intensity = 0.35
```

It allows to get/set the scroll intensity.


## Methods

### scrollTo

```js
instance.scrollTo(100)
```

It scrolls towards the given y.

### destroy

```js
instance.destroy()
```
It destroys all event listeners and removes all applied transformations.


## Examples

### Base

HTML

```html
<body>
  <main data-smooth-scroll>
    <!-- CONTENT HERE -->
  </main>
</body>
```

JS

```js
import SmoothScroll from '@fiad/toolbox/smooth-scroll'

const smoothScroll = new SmoothScroll({ intensity: 0.5 })
```

### Integration with ScrollTrigger by GSAP

```js
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SmoothScroll from '@fiad/toolbox/smooth-scroll'

gsap.registerPlugin(ScrollTrigger)

const smoothScroll = new SmoothScroll({ onScroll: ScrollTrigger.update })

ScrollTrigger.scrollerProxy('[data-smooth-scroll]', {
  scrollTop(value) {
    return (arguments.length)
      ? smoothScroll.scrollTo(value)
      : smoothScroll.scrollTop
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
})

// some ScrollTrigger based animations
```
