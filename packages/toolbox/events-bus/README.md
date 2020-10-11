# @fiad/toolbox/events

A simple and performing events management system

---

## Get started

```sh
npm i @fiad/toolbox
```

```js
import EventsBus from '@fiad/toolbox/events-bus'
```

An event bus is a kind of callbacks manager. In more detail, it stores the callbacks grouped by event type and executes them every time it receives a dispatching request for that type of event.


## Methods

### constructor

It creates a new *EventsBus* instance.

```js
import EventsBus from '@fiad/toolbox/events-bus'

const eventsBus = new EventsBus()
```


### subscribe

It adds a new entry to the callbacks stack related to the given event type.
Please note this will automatically be ignored if the given callback is already stored on the stack.

```js
eventsBus.subscribe(type, callback, options)
```

__OPTIONS OBJECT__:

| Property | Type | Description |
| --- | --- | --- |
| defaultPayload | *any* | The default payload to be passed to the callback when the event is dispatched. It is overwritten if a custom payload is passed to the *dispatch* function. |
| payloadFilter | *function* | A function that transforms the payload just before it is passed to the callback. For example, it's useful to rearrange or to format payload data*. |

💡 When an event is dispatched, the *options* object will be passed as second argument to the callback so that all information stored in it could be examined. This means that it could contain any kind of additional information that can be useful to check inside the callback at its execution time. So feel free to extend that object as you want.

💡 The *options* object passed to the callback will also contain the property *rawPayload* that retains the original payload, i.e. its value before being processed by the *payloadFilter*.


### unsubscribe

It removes the given callbacks from the stack related to the given event type.

```js
eventsBus.unsubscribe(type, callback)
```


### dispatch

It handles the dispatching of the given event type. Consequently, each callback stored in its stack will be executed.

```js
eventsBus.dispatch(type, payload)
```


### hasSubscriptions

Checks if any callback exists in the stack related to the given event type.

```js
if (eventsBus.hasSubscriptions(type)) {
  // something to do
}
```


### clear

It clears the callbacks stack related to the given event type. If no argument is passed, all stacks will be cleared.

```js
eventsBus.clear(type)
```
