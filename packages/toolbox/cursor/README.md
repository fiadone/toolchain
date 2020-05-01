# @fiad/toolbox/cursor

A performing custom cursors handler

---

## Get started

```sh
npm i @fiad/toolbox
```

```js
import Cursor from '@fiad/toolbox/cursor'
```

## Usage

Once imported, *Cursor* can be used both to instantiate a custom cursor and to statically access globally collected pointing information. Learn more by taking a look to the [examples](#examples) below.

## Methods

### constructor

```js
const cursor = new Cursor(el, config)
```

It creates a new *Cursor* instance.

| Param | Type | Description |
| --- | --- | --- |
| el | *Element* | The DOM element to be used as cursor |
| config | *object* | A configuration object |


__CONFIGURATION OBJECT__

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| origin | *number[]* | The position origin of the cursor (useful if a centering offset is needed). | *[0.5, 0.5]* |
| z | *number* | The cursor z-index. | *9999* |
| inertia | *number* | The lerping factor used to make cursor movements smoother (set to 1 for linear transformations). | *0.2* |
| triggers | *string[]* | The list of selectors to be observed around the DOM. | *['a', 'button', '[data-cursor]']* |
| onShow | *function* | A callback to be invoked on cursor show event. | *undefined* |
| onHide | *function* | A callback to be invoked on cursor hide event. | *undefined* |
| onMove | *function* | A callback to be invoked on cursor move event. It receives the current cursor coords. | *undefined* |
| onHover | *function* | A callback to be invoked on cursor hover event. It receives the matched trigger selector. | *undefined* |
| onHold | *function* | A callback to be invoked on cursor hold event. | *undefined* |
| onRelease | *function* | A callback to be invoked on cursor release event. | *undefined* |


__HOW IT WORKS__

When a new *Cursor* instance is created, the target element passed to the *constructor* will immediately start moving around the screen following the mouse pointer or touch movements according to the preferences defined in the configuration object. Moreover, some attributes will be automatically attached/detached to/from the element to let you manage some styles update:

| Attribute | Value | Description |
| --- | --- | ---|
| data-cursor-visible | - | It indicates that the pointer is moving on *document* area. It will added automatically when pointer enters in the *document* and removed when it leaves. |
| data-cursor-hover | the matched trigger selector | It indicates that the pointer is moving over a DOM element matching with one of the trigger selectors defined in the configuration object (or the default ones). |
| data-cursor-hold | - | It indicates that a pointer down event (*mousedown* or *touchstart*) occurred. It will automatically removed on *mouseup* or *touchend*. |


### destroy

```js
cursor.destroy()
```
It destroys all instance event listeners and removes all applied transformations.


### @static init

```js
Cursor.init()
```

It adds all event listeners aimed to globally collect pointing information. It's automatically called when a new instance of *Cursor* is created.


### @static get

```js
Cursor.get()
```

It provides the globally collected pointing information at current time.

Returned value:

```js
{
  coords: { x: {number}, y: {number} },
  visible: {boolean},
  holding: {boolean},
  target: {(Element|null)}
}
```

It's also possible to get a single property from the object above, by passing its key as argument to the method. For example:

```js
const { x, y } = Cursor.get('coords')
```


### @static destroy

```js
Cursor.destroy()
```

It removes all global event listeners.

⚠️ Attention: by destroying *Cursor* globally all the collected information will stop to be updated and no more events will be dispatched. Consequently, any *Cursor* instance will result broken.


## Examples

### Implementing a custom cursor:

HTML

```html
<div id="cursor">
  <span class="cursor-circle"></span>
</div>
```

JS

```js
import Cursor from '@fiad/toolbox/cursor'

const el = document.getElementById('cursor')
const cursor = new Cursor(el)
```

SCSS

```scss
.cursor-circle {
  width: 48px;
  height: 48px;
  border: solid 2px currentColor;
  border-radius: 50%;
  color: red;
  opacity: 0;
  transition-property: transform, color, opacity;
  transition-duration: 0.3s;

  [data-cursor-visible] & {
    opacity: 1;
  }

  [data-cursor-hover] & {
    transform: scale(1.25);
  }

  [data-cursor-hover="a"] & {
    color: blue;
  }

  [data-cursor-hold] & {
    transform: scale(0.75);
  }
}
```


### Using globally collected pointing information:

```js
import Cursor from '@fiad/toolbox/cursor'
import CanvasBackground from 'path/to/canvas/background'

Cursor.init()

function updateBackground() {
  const { x, y } = Cursor.get('coords')
  CanvasBackground.setDisplacementOrigin(x, y)
  requestAnimationFrame(updateBackground)
}

requestAnimationFrame(updateBackground)
```
