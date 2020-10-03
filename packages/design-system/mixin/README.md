# @fiad/design-system/mixins

A collection of scss mixin

---

## Mixin list

### Aspect ratio

It provides a set of rules that preserves the original aspect ratio of an element while it's scaled according to the sizes of a parent container.

```scss
.video {
  @include aspect-ratio(16, 9); // using well-known lowest terms
}

.image {
  @include aspect-ratio(480, 320); // using explicit sizes
}
```

### Auto-scaling

It provides an auto-scaling system based on *relative units*.

__Definition__:

```scss
@include auto-scaling($mobileNaturalSize, $desktopNaturalSize, $mobileBreakpoints, $desktopBreakpoints);
```

| Argument | Description | Default |
| --- | --- | --- |
| $mobileNaturalSize | The width of the given mobile layout (.psd, .sketch, etc). | *320* |
| $desktopNaturalSize | The width of the given desktop layout (.psd, .sketch, etc). | *1024* |
| $mobileBreakpoints | The mobile breakpoints to be handled. | *(320, 375, 414, 640, 768, 992)* |
| $desktopBreakpoints | The desktop breakpoints to be handled. | *(1024, 1152, 1280, 1366, 1440, 1600, 1920, 2560)* |

__Usage__:

SCSS:

```scss
html {
  @include auto-scaling(375, 1440);
}

.container {
  max-width: 80rem; // this size will proportionally scale through the defined breakpoints
}
```

CSS OUTPUT:

```css
@media screen and (min-width: 320px) {
  html {
    font-size: 85%;
  }
}

@media screen and (min-width: 375px) {
  html {
    font-size: 100%;
  }
}

@media screen and (min-width: 414px) {
  html {
    font-size: 110%;
  }
}

@media screen and (min-width: 640px) {
  html {
    font-size: 170%;
  }
}

@media screen and (min-width: 768px) {
  html {
    font-size: 204%;
  }
}

@media screen and (min-width: 1024px) {
  html {
    font-size: 71%;
  }
}

@media screen and (min-width: 1280px) {
  html {
    font-size: 88%;
  }
}

@media screen and (min-width: 1366px) {
  html {
    font-size: 94%;
  }
}

@media screen and (min-width: 1440px) {
  html {
    font-size: 100%;
  }
}

@media screen and (min-width: 1600px) {
  html {
    font-size: 111%;
  }
}

@media screen and (min-width: 1920px) {
  html {
    font-size: 133%;
  }
}

@media screen and (min-width: 2560px) {
  html {
    font-size: 177%;
  }
}
```

__How it works__:

The mixin generates a *font-size* rule for each defined breakpoint, setting a proportional percentage value compared to the given natural one (mobile or desktop according to the current viewport width). This way, a proportional *font-size* context is created and it's possible to auto-scale elements sizes by using *relative units*.

It's recommended to implement a global auto-scaling context by including the mixin between the *html* tag style rules and then using *rem* to set elements width, height, paddings, margins, and all other kinds of sizes.
However, if it's required a specific application part only to be auto-scaled, it's also possible to create a "local" auto-scaling context: just include the mixin between the style rules of a wrapper and then set all dimensions for its children using *em*.

> ⚠️ __Notice__: since the mixin widely uses the *font-size* rule, pay attention when styling typography if you choose a "local" context approach. In this case, try to apply typographic rules as deeply as possible, avoiding parent styles inheriting.

> 💡 __Tips__: since *px-to-(r)em* conversion may produce many decimal places and the auto-scaling system is based on percentage values, you may encounter some rendering issues due to subpixel division. This usually happens when dealing with odd values or trying to scale too small values. As a best practice, try to round sizes to multiples of 4, expecially for horizontal dimensions (e.g. margin, padding, width, etc), and avoid to scale elements large less than 8px or thin borders.

### Framework rules

It generates a set of *functional CSS classes*.

__Definition__:

```scss
@mixin framework-rules($base-class, $specs);
```

__Usage__:

SCSS:

```scss
@include framework-rules("m", (
  "property": (
    "_": "margin",        // .m-
    "t": "margin-top",    // .mt-
    "r": "margin-right",  // .mr-
    "b": "margin-bottom", // .mb-
    "l": "margin-left"    // .ml-
  ),
  "value": (
    "0": 0,               // .m[property]-0
    "1": 8px,             // .m[property]-1
    "2": 16px,            // .m[property]-2
    "3": 24px,            // .m[property]-3
    "4": 32px,            // .m[property]-4
    "5": 40px,            // .m[property]-5
    "6": 48px,            // .m[property]-6
    "7": 56px,            // .m[property]-7
    "8": 64px             // .m[property]-8
  ),
  "breakpoints": (
    "sm",                 // .sm:m[property]-[value]
    "md",                 // .md:m[property]-[value]
    "lg"                  // .lg:m[property]-[value]
  )
));
```

> ⚠️ __Notice__: the "breakpoints" property will only work if the global variable $breakpoints is defined.

HTML:

```html
<h1 class="m-2">Title</h1>
<p class="mt-6 sm:mt-4 md:mt-3 lg:mt-2">Lorem ipsum</p>
```

CSS OUTPUT:

```css
.m-0 {
  margin: 0;
}
/* [...] */
.m-8 {
  margin: 64px;
}
.mt-0 {
  margin-top: 0;
}
/* [...] */
.mt-8 {
  margin-top: 64px;
}
/* [...] */
@media screen and (min-width: 768px) {
  .sm\:m-0 {
    margin: 0;
  }
  /* [...] */
  .sm\:m-8 {
    margin: 64px;
  }
}
/* [...] */
```

### Grid

It generates a simple grid system (based on *CSS grid*).

__Definition__:

```scss
@include grid($columns, $gap, $breakpoints);
```

| Argument | Description | Default |
| --- | --- | --- |
| $columns | The grid size, i.e. the number of column subdivisions. | *12* |
| $gap | The gap between columns and rows. | *1rem* |
| $breakpoints | The breakpoints to be handled to generate responsive rules. | *("sm": 768, "md": 1024, "lg": 1366)* |

__Usage__:

SCSS:

```scss
@include grid();
```

HTML:

```html
<div class="row">
  <!--
    12 columns cells under 768px
    6 columns cells under 1024px
    4 columns cells under 1366px
    3 columns cells from 1366px
  -->
  <div class="col sm:size-6 md:size-4 lg:size-3"></div>
  <div class="col sm:size-6 md:size-4 lg:size-3"></div>
  <div class="col sm:size-6 md:size-4 lg:size-3"></div>
  <div class="col sm:size-6 md:size-4 lg:size-3"></div>
</div>
<div class="row">
  <!--
    12 columns cell under 1024px
    10 columns cell with 1 column offset under 1366px
    8 columns cell with 2 columns offset from 1366px
  -->
  <div class="col md:size-10 md:start-2 lg:size-8 lg:start-3"></div>
</div>
```

### Flex Grid

It generates a simple grid system (based on *CSS flex*).

__Definition__:

```scss
@include flex-grid($columns, $gap, $breakpoints);
```

| Argument | Description | Default |
| --- | --- | --- |
| $columns | The grid size, i.e. the number of column subdivisions. | *12* |
| $gap | The gap between columns and rows. | *1rem* |
| $breakpoints | The breakpoints to be handled to generate responsive rules. | *("sm": 768, "md": 1024, "lg": 1366)* |

__Usage__:

SCSS:

```scss
@include grid();
```

HTML:

```html
<div class="row">
  <!--
    12 columns cells under 768px
    6 columns cells under 1024px
    4 columns cells under 1366px
    3 columns cells from 1366px
  -->
  <div class="col sm:size-6 md:size-4 lg:size-3"></div>
  <div class="col sm:size-6 md:size-4 lg:size-3"></div>
  <div class="col sm:size-6 md:size-4 lg:size-3"></div>
  <div class="col sm:size-6 md:size-4 lg:size-3"></div>
</div>
<div class="row">
  <!--
    12 columns cell under 1024px
    10 columns cell with 1 column offset under 1366px
    8 columns cell with 2 columns offset from 1366px
  -->
  <div class="col md:size-10 md:offset-2 lg:size-8 lg:offset-3"></div>
</div>
```
