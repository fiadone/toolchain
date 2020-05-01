# @fiad/toolbox/events

A simple and performing events management system

---

## Get started

```sh
npm i @fiad/toolbox
```


## EventsManager

```js
import EventsManager from '@fiad/toolbox/events'
```

The *EventsManager* represents a unified events management system that combines the performance provided by a DOM events centralization with the flexibility of custom events. More specifically, the system aims to minimize the number of event listeners registered by an application by delegating the callbacks handling to an internal events bus that also allows to intercept custom events. All of this with the consistency of a single api.


### Methods

#### on

It handles event(s) subscription.

```js
// dom event
EventsManager.on(type, target, callback, options)
// custom event
EventsManager.on(type, callback, options)
```

| Argument | Type | Description |
| --- | --- | --- |
| type | *string, string[]* | The event type(s) to be listened. |
| target | *Element* | The event target (available for dom events only). |
| callback | *function* | The event handler. |
| options | *object* | Look below for details. |

__OPTIONS OBJECT__:

When dealing with custom events, refers to *[EventsBus.subscribe](#subscribe)* to learn more about the *options* argument.

When dealing with dom events, in addition to those defined for custom events, other properties are available:

| Property | Type | Description |
| --- | --- | --- |
| alias | *string* | An alternative name to be used in place of event type. |
| delegateTo | *string* | The selector of the element(s) to delegate the event to. |
| passive | *boolean* | Look at *[EventTarget.addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)* to learn more. |
| capture | *boolean* | Look at *[EventTarget.addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)* to learn more. |


#### off

It handles event unsubscription.

```js
// dom event
EventsManager.off(type, target, callback)
// custom event
EventsManager.off(type, callback)
```


#### dispatch

It handles event dispatching.

```js
// dom event
EventsManager.dispatch(type, target, payload)
// custom event
EventsManager.dispatch(type, payload)
```

💡 As default when dealing with dom events, the payload passed to the callback is preserved to be the native *Event* instance related to the specified event type. Anyway, if a custom payload is passed to the *dispatch* method, it's stored to the *details* property of the *Event* object so it doesn't get lost and remains retrievable in the callback.
If a different behavior is required, it's always possible to specify a *payloadFilter* option (look at *[EventsManager.on](#on)* and *[EventsBus.subscribe](#subscribe)* for details) to apply a transformation just before the payload is passed to the callback.


## EventsBus

```js
import EventsBus from '@fiad/toolbox/events/bus'
```

As mentioned in the *[EventsManager](#eventsmanager)* description, an event bus is a kind of callbacks manager. In more detail, it stores the callbacks grouped by event type and executes them every time it receives a dispatching request for that type of event.


### Methods

#### constructor

It creates a new *EventsBus* instance.

```js
import EventsBus from '@fiad/toolbox/events/bus'

const eventsBus = new EventsBus()
```


#### subscribe

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


#### unsubscribe

It removes the given callbacks from the stack related to the given event type.

```js
eventsBus.unsubscribe(type, callback)
```


#### dispatch

It handles the dispatching of the given event type. Consequently, each callback stored in its stack will be executed.

```js
eventsBus.dispatch(type, payload)
```


#### hasSubscriptions

Checks if any callback exists in the stack related to the given event type.

```js
if (eventsBus.hasSubscriptions(type)) {
  // something to do
}
```


#### clear

It clears the callbacks stack related to the given event type. If no argument is passed, all stacks will be cleared.

```js
eventsBus.clear(type)
```
