# @fiad/toolbox/strings

A collection of utility functions for strings manipulation

---

## Get started

```sh
npm i @fiad/toolbox
```

```js
import * as strings from '@fiad/toolbox/strings'
```


## Functions list

### capitalize

It makes the first letter of (each word of) the given string uppercase:

```js
import { capitalize } from '@fiad/toolbox/strings'

capitalize('sample string') // Sample String
```

### uncapitalize

It makes the first letter of (each word of) the given string lowercase:

```js
import { uncapitalize } from '@fiad/toolbox/strings'

uncapitalize('Sample String') // sample string
```

### camelCase

It rewrites the given string in *camelCase*:

```js
import { camelCase } from '@fiad/toolbox/strings'

camelCase('sample string') // sampleString
```

### pascalCase

It rewrites the given string in *PascalCase*:

```js
import { pascalCase } from '@fiad/toolbox/strings'

pascalCase('sample string') // SampleString
```

### snakeCase

It rewrites the given string in *snake_case*:

```js
import { snakeCase } from '@fiad/toolbox/strings'

snakeCase('sample string') // sample_string
```

### kebabCase

It rewrites the given string in *kebab-case*:

```js
import { kebabCase } from '@fiad/toolbox/strings'

kebabCase('sample string') // sample-string
```
