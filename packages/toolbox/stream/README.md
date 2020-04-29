# @fiad/toolbox/stream

A consistent logger and error management system

---

## Usage

```js
import Stream from '@fiad/toolbox/stream'

// some requiring logs code
```

*Stream* is exported as a static class, so all methods can be invoked directly without any instantiation.

## Methods

#### log

It logs a formatted message in the console:

```js
Stream.log(message, config)
```

#### throw

It throws an error:

```js
Stream.throw(message, code)
```

#### catchable

It creates a high order function that implements the try/catch block and handles error logging:

```js
Stream.catchable(fn, config)
```

## Configuration

A configuration object can be passed as second argument to both *log* and *throw* methods in order to configure and customize the output. The following properties are allowed:

#### type

It's a string that defines the log type. As *Stream* works as a *console* wrapper, all method names of the *[Console object](https://developer.mozilla.org/it/docs/Web/API/Console)* are allowed.

#### namespace

It's a message prefix that identifies the main scope of logs. As it usually corresponds to the application name, it can also be set globally, like follows:

```js
Stream.namespace = 'My app'
```

This way you can avoid declaring it in every configuration, but if you do, you can still overwrite it.

#### context

Like *namespace*, it's a message prefix that identifies the logs scope, but more specifically (so it can't be set globally). It usually refers to a module or a feature of the application and it's show just after the *namespace*.


#### data

Sometimes the message alone may not be enough and the situation requires more details. In that case this property can be used to supply any kind (objects, arrays, etc.) of additional info.

#### style

It's an inline CSS string that allows to add some style to the log message.

## Examples

```js
import Stream from '@fiad/toolbox/stream'

Stream.namespace = 'My app'
```

#### Logging

```js
const onLogin = user => {
  Stream.log('User logged in', { context: 'sso', data: user, style: 'color: green;' })
}

const onLogout = () => {
  Stream.log('User logged out', { context: 'sso' })
}

// [...] the user logs in/out in the application lifecycle
```

The code above will produce the following console output:

```
[My app][sso] User logged in > {firstname: 'John', lastname: 'Doe'}

[My app][sso] User logged out
```

#### Throwing/catching

```js
class Component {
  constructor(id) {
    this.el = id ? document.getElementById(id) : null

    if (!this.el) {
      Stream.throw('Construction failed: invalid id or missing element')
    }
  }
}

class ComponentFactory {
  static create = Stream.catchable(id => {
    return new Component(id)
  }, { context: 'components' })
}

const a = ComponentFactory.create(false)
```

The code above will produce the following console output:

```
[My app][components] Construction failed: invalid id or missing element
```
