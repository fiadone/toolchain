# @fiad/toolbox/stream

A consistent logger and error management system

---

## Methods

#### log

```js
Stream.log('Log message', {/* config */})
```

#### throw

```js
Stream.throw('Error message', {/* config */})
```

### Configuration object

A configuration object can be passed as second argument to both *log* and *throw* methods in order to configure and customize the output. The following properties are allowed:

##### type

It's a string that defines the log type. As *Stream* works as a *console* wrapper, all method names of the *[Console object](https://developer.mozilla.org/it/docs/Web/API/Console)* are allowed.

##### namespace

It's a message prefix that identifies the main scope of logs. As it usually corresponds to the application name, it can also be set globally, like follows:

```js
Stream.namespace = 'My app'
```

This way you can avoid declaring it in every configuration, but if you do, you can still overwrite it.

##### context

Like *namespace*, it's a message prefix that identifies the logs scope, but more specifically (so it can't be set globally). It usually refers to a module or a feature of the application and it's show just after the *namespace*.


##### data

Sometimes the message alone may not be enough and the situation requires more details. In that case this property can be used to supply any kind (objects, arrays, etc.) of additional info.


### Example

```js
import Stream from '@fiad/toolbox/stream'

Stream.namespace = 'My app'

const onLogin = user => {
  Stream.log('User logged in', { context: 'sso', data: user })
}

const onLogout = () => {
  Stream.log('User logged out', { context: 'sso' })
}

// [...] the user logs in/out in the application lifecycle
```

The code above will produce the following output console:

```yml


[My app][sso] User logged in > {firstname: 'John', lastname: 'Doe'}

[My app][sso] User logged out
```


