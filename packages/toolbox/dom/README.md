# @fiad/toolbox/dom

A collection of utility functions to mandage DOM elements

---

## Get started

```sh
npm i @fiad/toolbox
```

```js
import * as dom from '@fiad/toolbox/dom'
```

## Functions list

### getScrollRatio

It retrieves how much the given element has been scrolled into viewport.

```js
import { getScrollRatio } from '@fiad/toolbox/dom'

const el = document.getElementById('target-id')
const scrollRatio = getScrollRatio(el)
```

The return value will be a number between 0 and 1 (inclusive) where 0 means that the element has not yet entered the viewport (i.e. *el.getBoundingClientRect().top* is greater than the sum of *window.innerHeight* and *window.scrollTop*), while 1 indicates that the element has already completely passed through the viewport (i.e. *el.getBoundingClientRect().bottom* is less than or equal to 0).


### getIntersection

It retrieves how much the given element is intersecting the viewport.

```js
import { getIntersection } from '@fiad/toolbox/dom'

const el = document.getElementById('target-id')
const intersection = getIntersection(el)
```

The return value will be an object containing the following properties:

- *size*: a number representing the size in pixels of the element portion that is intersecting the viewport; it will be between 0 and the element height (inclusive)

- *ratio*: same as *size*, but between 0 and 1 (inclusive)


### enhance

It decorates the given element with *scrollRatio* and *intersection* getters and optionally with the given custom properties.

```js
import { enhance } from '@fiad/toolbox/dom'

const el = document.getElementById('target-id')
const enhancedEl = enhance(el, { customProp: 'value' })
```

The return value will be an *Element* instance decorated with the given custom properties and the following getters:

- *getScrollRatio*: applies *[dom.getScrollRatio](#getScrollRatio)* on *this*
- *getIntersection*: applies *[dom.getIntersection](#getIntersection)* on *this*


### getElement

It performs a *querySelector*.

```js
import { getElement } from '@fiad/toolbox/dom'

const el = getElement('target-id', options)
```

__OPTIONS OBJECT__
| Property | Type | Description | Default |
| --- | --- | --- | --- |
| context | *Element* | The root element to perform query from. | *document* |
| enhanced | *boolean* | It defines if the returned element should [be enhanced](#enhance). | *false* |


### getElements

It performs a *querySelectorAll*. It works the same as *[getElement](#getElement)* but returns an array of *Element*.


### matches

It performs a match test to verify if an element matches with the given selector (or list of selectors).

```js
import { matches } from '@fiad/toolbox/dom'

document.addEventListener('click', e => {
  if (matches(e.target, ['a', '.link'])) {
    e.preventDefault()
    // custom routing
  }
})
```


### isDescendantOf

It performs a match test to verify if an element has ancestors matching with the given selector (or list of selectors).

```html
<article class="card">
  <a class="card__content" href="/somewhere">
    <img class="card__image" src="/assets/image.jpg">
    <h2 class="card_title">Card title</h2>
    <p class="card_description">Card description</p>
    <button class="button" type="button" onclick="something">Learn more</button>
  </button>
</article>
```

```js
import { matches, isDescendantOf } from '@fiad/toolbox/dom'

document.addEventListener('click', e => {
  if (matches(e.target, '.button') && isDescendantOf(e.target, 'a')) {
    e.stopPropagation() // preventing anchors behaviors
  }
})
```

> ⚠️ __Disclaimer__: the examples above are only intended to demonstrate more clearly how the functions work. Use of the *matches* and *isDescendantOf* functions sparingly to prevent any loss of performance.
