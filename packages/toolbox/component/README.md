# @fiad/toolbox/component

A simple base class aimed to attach logics and features to DOM elements

---

## Get started

```sh
npm i @fiad/toolbox
```

```js
import Component from '@fiad/toolbox/component'
```

The *Component* module represents a base class to be extended in order to implement a real-case component. It simply attaches some logics and features to a given DOM element and allows to auto-bind properties and referencing child nodes defined at *html* level. It also comes with a simple and lean built-in lifecycle.


## Usage

Once imported, extend *Component* as follows:

```js
class MyCustomComponent extends Component {
  // ...
}
```

## Methods

### constructor

```js
const instance = new Component(el, config)
```

| Argument | Type | Description |
| --- | --- | --- |
| el | *Element* | The *DOM* element to attach the component to. |
| config | *object* | The component configuration object. It's aimed to contain any option eventually needed by a specific implementation. |

__Configuration object__

Even though the *config* argument can host any property needed by the component implementation, some default options need to be mentioned:

| Property | Type | Description |
| --- | --- | --- |
| defaultProps | *object* | The default component's properties. |


## Built-in properties

### root

The component's root *DOM* element.

__Use case__

```js
init() {
  const { clientHeight } = this.root
  // ...
}
```

### props

The component's properties. It's the result of merging the *config.defaultProps* with the properties dynamically retrieved from the *DOM*. Look at [Auto-binding](#auto-binding) section to learn more.

__Use case__

```js
init() {
  if (this.props.someProp) {
    // ...
  }
}
```

### refs

The component's referring child nodes. It collects all component's root descendants marked as *reference*. It's useful, for example, to define component's UI elements, so they result automatically accessible from the component instance. Look at [Auto-binding](#auto-binding) section to learn more.

__Use case__

```html
<div data-component="MyComponent">
  <button type="button" data-ref="button">
</div>
```

```js
class MyComponent extends Component {
  // ...

  init() {
    const { button } = this.refs

    button.addEventListener('click' /* ... */)
  }

  destroy() {
    const { button } = this.refs

    button.removeEventListener('click' /* ... */)
  }
}
```


## Auto-binding

To make dynamic data-binding easier, some *data-* attributes can be used to define properties and child nodes references directly at *html* level, then finding them already available in the component's *js*. This is particularly useful when a component needs to load some dynamic properties directly from the view, because, for exemple, the server passed them through it.

| Attribute | Target | Description | Example |
| --- | --- | --- | --- |
| data-foo | *root* | It defines a property named *foo* that will be accessible by *this.props.foo* within the component instance. The value of this property will be the attribute value eventually processed by *JSON.parse*. | data-error="Unathorized" |
| data-ref | *child nodes* | It defines a reference to a child node named *submit* that will be accessible by *this.refs.submit* within the component instance. The value of this property will be the *Element* instance the data-attribute is defined on. | data-ref="submit" |

## Helpers

Along with the *data-* attributes just seen above, the *data-component* attribute can be used too. It allows to automatically create a component instance for each *DOM* node that references to it. This attribute, however, doesn't work alone, but requires some helpers usage.

### attach

It performs a query over the *DOM* to retrieve all the elements that requires a component to be attached on. So a *Component* instance is iteratively created and attached to the queried elements.

| Argument | Type | Description | Default |
| --- | --- | --- | --- |
| components | *object* | The components mapping object. | {} |
| root | *Document, Element* | The application/module root. It's the *DOM* node to perform a query on to collect all elements that requires a *Component* to be attached on. | *document* |

__Components entries__

A component can be mapped in the *components* argument in two different ways, according to implementation needs. Take a look to the example below to learn more.

__Return value__

The function returns an object wrapping all the created instances. By default, the key of each instance is its component class name in *camelCase*. It can be easily overwritten by the *key* property in the component configuration model provided by the *attach* helper. Take a look to the example below to learn more.

#### Example

HTML

```html
<div data-component="MyComponent">
  ...
</div>
```

JS
```js
import { attach } from '@fiad/toolbox/component'
import MyComponent from './components/MyComponent'
// ...

function Page() {
  this.components = attach({
    MyComponent,
    // ...
  })

  // the instance will be accessible by this.components.myComponent
}

```

or, if MyComponent requires some configuration:

```js
function Page() {
  this.components = attach({
    MyComponent: {
      key: 'myAlias',
      handler: MyComponent,
      ...config // any property will be passed to MyComponent constructor
    },
    // ...
  })

  // the instance will be accessible by this.components.myAlias
}
```

### detach

At some point, it may be needed to destroy some components, for example after a page transition in a client-based navigation context. In that case, this method can rush to help. It simply tries to invoke a *destroy* method on each *Component* instance previously created and then removes it from the components map. So remember that defining the *destroy* method in your custom components can always be considered a best practice, expecially if they come along with some event listeners that you want to prevent to persist in memory after component deletion.

| Argument | Type | Description |
| --- | --- | --- |
| components | *object* | The *Component* instances map. |

__Use case__

```js
import { detach } from '@fiad/toolbox/component'
// ...

application.on('pagetransition', (currentPage, nextPage) => {
  detach(currentPage.components)
  // ...
})
```


## State management

As seen so far, *Component* is mostly a stateless module, at least until you start tricking with its properties. Anyway, if a state-based implementation is required, a more convenient way to get it is by using the *[@fiad/toolbox/store](https://github.com/fiadone/carpentry/blob/master/packages/toolbox/store/README.md)* module. Here below a simple example:

```js
import Store from '@fiad/toolbox/store'
import Component from '@fiad/toolbox/component'

export default class ComponentWithState extends Component {
  constructor(...args) {
    super(...args)

    this.state = new Store(this.config.initialState || {})
    this.state.observe('someProp', this.onSomePropUpdate)
  }

  onSomePropUpdate = value => {
    console.log('someProp updated:', value)
  }

  destroy() {
    this.state.unobserve('someProp', this.onSomePropUpdate)
  }
}
```
