# @fiad/toolbox/store

A simple state management handler

---

## Get started

```sh
npm i @fiad/toolbox
```

```js
import Store from '@fiad/toolbox/store'
```

## Methods

### constructor

```js
const store = new Store({ ...initialState })
```


### get

It retrieves the whole current state or the current value of the given property.

```js
const state = store.get()

// or if only one property is needed
const someProp = store.get('someProp')
```


### set

It updates the values of the given properties, while the rest of the state remains preserved.

```js
store.set({ someProp: 'newValue', otherProp: 'otherValue' })

// or if only one property needs to be updated
store.set('someProp', 'newValue')
```


### reset

It resets the state to its initial value.

```js
store.reset()
```


### observe

It adds a listener that runs the given callback when the given property is updated.

```js
store.observe('someProp', value => console.log(value))

// the updated value of someProp will be logged in the console on change
```


### unobserve

It removes the listener registered for the given property.

```js
store.unobserve('someProp')
```
