# @fiad/toolbox/utils

A collection of miscellaneous utility functions

---

## Get started

```sh
npm i @fiad/toolbox
```

```js
import * as utils from '@fiad/toolbox/utils'
```


## Utilities list

### debounce

It handles function [debouncing](https://css-tricks.com/debouncing-throttling-explained-examples/):

```js
import debounce from '@fiad/toolbox/utils/debounce'

const handler = () => {
  // something to do on resize
}

const debounceTime = 200
const onResize = debounce(handler, debounceTime)

window.addEventListener('resize', onResize)
```

### throttle

It handles function [throttling](https://css-tricks.com/debouncing-throttling-explained-examples/):

```js
import throttle from '@fiad/toolbox/utils/throttle'

const handler = () => {
  // something to do on click
}

const throttleTime = 200
const onClick = throttle(handler, throttleTime)

document.addEventListener('click', onClick)
```

### equal

It checks if two entities are equal:

```js
import equal from '@fiad/toolbox/utils/equal'

// some code that defines the a and b entities

if (equal(a, b)) {
  // scoped code
}
```

### deepMerge

It deeply merges two objects (or arrays):

```js
import deepMerge from '@fiad/toolbox/utils/deepmerge'

// some code that defines the a and b objects/arrays

const c = deepMerge(a, b)
```

### memoize

It allows to cache results of complex functions so that when they are recalled later the result will be returned directly from the internal cache without requiring a new execution

```js
import memoize from '@fiad/toolbox/utils/memoize'

const fn = (...args) => {
  // some complex operation
}

const memoFn = memoize(fn)
const result = memoFn(/* some arguments */)
```

### QueryString

It handles query string transformations.

```js
import QueryString from '@fiad/toolbox/utils/query-string'
```

#### METHODS:

__toObject__

It takes the given query string (*window.location.search* as default) and converts it into an object.

```js
const params = QueryString.toObject('?resource=catalogue&token=JGwcicjA1Rl4whIBmrei')

// { resource: 'catalogue', token: 'JGwcicjA1Rl4whIBmrei' }
```

__fromObject__

It builds a query string starting from an object of parameters.

```js
const queryString = QueryString.fromObject({
  resource: 'catalogue',
  token: 'JGwcicjA1Rl4whIBmrei'
})

// ?resource=catalogue&token=JGwcicjA1Rl4whIBmrei
```

