# @fiad/toolbox/math

A collection of math utility functions

---

## Functions list

#### map

It maps a value across two ranges:

```js
import { map } from '@fiad/toolbox/math'

const value = 0.5
const fromRange = [0, 1]
const toRange = [0, 1024]

map(value, fromRange, toRange) // 512
```

Please note that if the first member of a range is 0 it can be omitted. So you can obtain the same result by turning the example above in:

```js
map(0.5, 1, 1024) // 512
```

And here below a real-world use case example:

```js
document.addEventListener('click', e => {
  const { clientX, clientY } = e
  const { innerWidth: w, innerHeight: h } = window

  console.log('Event distance from center', {
    x: map(clientX, [0, w], [-(w/2), (w/2)]),
    y: map(clientY, [0, h], [-(h/2), (h/2)])
  })
})
```

#### clamp

It clamps a value in a range, i.e. it limits a value between two bounds (included):

```js
import { clamp } from '@fiad/toolbox/math'

const value = 1.25 // e.g. the result of some operation
const min = 0
const max = 1

clamp(value, min, max) // 1
```

#### lerp

It calculates the linear interpolant between two values:

```js
import { lerp } from '@fiad/toolbox/math'

const min = 0
const max = 100
const factor = 0.25

lerp(min, max, factor) // 25
```
