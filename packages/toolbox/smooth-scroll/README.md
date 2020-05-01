# @fiad/toolbox/smooth-scroll

A performing smooth scroll handler not affecting native scroll behaviors

---

## Get started

```sh
npm i @fiad/toolbox
```

```js
import SmoothScroll from '@fiad/toolbox/smooth-scroll'
```

## Methods

### enable

```js
SmoothScroll.enable(config)
```

It enables smooth scrolling according to the (optional) given preferences.

⚠️ *SmoothScroll* requires a specific DOM structure to properly work. Check out the [example](#example) below to lern more.

__CONFIGURATION OBJECT__

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| inertia | *number* | The lerping factor used to make scroll smoother (set to 1 for linear scrolling). | *0.2* |


### disable

```js
Smooth.disable()
```
It destroys all event listeners and removes all applied transformations.


## Example

HTML

```html
<body>
  <main data-scroll-wrapper>
    <div data-scroll-content>
      <!-- CONTENT HERE -->
    </div>
  </main>
</body>
```

JS

```js
import { mobile, touch } from '@fiad/toolbox/detect'
import SmoothScroll from '@fiad/toolbox/smooth-scroll'

if (!mobile.any && !touch) {
  SmoothScroll.enable()
}
```
