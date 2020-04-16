# @fiad/cli

A simple command line interface that helps in scaffolding and configuring operations

---

## COMMANDS LIST

#### CLONE

Handles recursive files copying from a source directory to a destination one.

```
npx @fiad/cli clone --src src/path --dest dest/path --context your-module
```

__Params:__

- *src*: the source directory to copy files from (required)
- *dest*: the destination directory to copy files to (optional, uses *cwd* as default)
- *context*: a string that defines the operation context in order to produce more specific log messages (optional)

---

##### INSTALL

Handles dependencies installation from npm repository.

```
npx @fiad/cli install --manifest path/to/dependencies.json --yarn --context your-module
```

__Params:__

- *manifest*: the manifest filepath (required)
- *yarn*: if passed, allows installation via *yarn*
- *context*: a string that defines the operation context in order to produce more specific log messages (optional)


__JSON manifest schema:__
```json
{
  "dependencies": [
    "gsap",
    "lodash"
  ],
  "devDependencies": [
    "jest",
    "webpack"
  ]
}
```

---

##### WIZARD

A survey provider to collect user preferences (based on *[inquirer.js](https://github.com/SBoudrias/Inquirer.js)*).

```
npx @fiad/cli wizard --questions path/to/questions.js --handler path/to/handler.js --heading Foo --color blue
```

__Params:__

- *questions*: the questions repository filepath (required)
- *handler*: the answers handler filepath (required)
- *heading*: a heading banner text to customize the wizard (optional)
- *color*: the heading banner text color (optional)

__Questions file schema:__
```js
module.exports = Object[];
```
For details about questions definition, check the [inquirer.prompt method](https://github.com/SBoudrias/Inquirer.js#inquirerpromptquestions---promise) documentation.

__Handler file schema:__
```js
module.exports = function (answers) {
  console.log(answers);
};
```
