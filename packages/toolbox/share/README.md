# @fiad/toolbox/share

A simple social sharing management utility

---

## Get started

```sh
npm i @fiad/toolbox
```

```js
import ShareManager from '@fiad/toolbox/share'
```

## Methods

### listenClicks

It enables a global event listener that observes clicks on elements with *data-share-target* attribute. Look at [examples](#examples) below to learn more.

```js
ShareManager.listenClicks()
```


### unlistenClicks

It disables the global event listener

```js
ShareManager.unlistenClicks()
```


### generateUrl

__OPTIONS OBJECT__

| Property | Type | Description |
| --- | --- | --- |
| target | *string* | The target platform/network to share on. |
| ...data | *any* | A collection of information to be shared. Look at *[Supported attributes](#supported-attributes)* and *[Examples](#examples)* below to learn more. |

### share

It opens a share dialog window.

```js
ShareManager.share(options)
```

It expects the same *options* object defined for *[generateUrl](#generateUrl)* with the addition of the *baseUrl* property that allows to handle custom sharing. Look at [examples](#examples) below to learn more.


## Available targets

- *whatsapp*
- *telegram*
- *facebook*
- *twitter*
- *googleplus*
- *linkedin*
- *mail*

## Supported attributes
| Attribute | Default | Whatsapp | Telegram | Facebook | Twitter | Google+ | LinkedIn | E-mail |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| (data-) url | *window.location.href* | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| (data-) title | *undefined* | ✘ | ✘ | ✘ | ✘ | ✘ | ✔ | ✔ |
| (data-) description | *undefined* | ✔ | ✔ | ✘ | ✔ | ✘ | ✔ | ✔ |


## Examples

#### Automatic triggering

HTML

```html
<ul class="social-sharing">
  <li>
    <a href="#" data-share-target="facebook">Facebook</a>
  </li>
  <li>
    <a href="#" data-share-target="twitter" data-share-description="Lorem ispum">Twitter</a>
  </li>
  <li>
    <a href="#" data-share-target="mail" data-share-title="My website" data-share-description="Lorem ispum">E-mail</a>
  </li>
</ul>
```

JS

```js
import ShareManager from '@fiad/toolbox/share'

ShareManager.listenClicks()
```

#### Manual sharing

```js
import ShareManager from '@fiad/toolbox/share'

const fbShareTrigger = document.getElementById('js-share-fb')
const customShareTrigger = document.getElementById('js-share-custom')

// handling current url sharing on Facebook
fbShareTrigger.addEventListener('click', () => {
  ShareManager.share({ target: 'facebook' })
})

 // handling custom sharing
customShareTrigger.addEventListener('click', () => {
  ShareManager.share({
    baseUrl: 'https://my-social-platform.ext/share',
    status: `I visited an amazing website! Take a look at https://my-amazing-website.ext`
  })

  // generated share url:
  // https://my-social-platform.ext/share?status=I%20visited%20an%20amazing%20website!%20Take%20a%20look%20at%20https%3A%2F%2Fmy-amazing-website.ext
}
```
