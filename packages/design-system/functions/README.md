# @fiad/design-system/functions

A collection of scss utility functions

---

## Functions list

### Unit conversion

#### rem

It provides a *px* to *rem* conversion.

__Definition__:
```scss
rem($px, $context, $threshold)
```

| Argument | Type | Description | Default |
| --- | --- | --- | --- |
| $px | *number* | The size to be converted from *px* to *rem*. | - |
| $context | *number* | The conversion unit, i.e. the amount of *pixels* equivalent to the base value (1) of the target unit. | *16* |
| $threshold | *number* | The limit below which the conversion is ignored in order to prevent rendering issues due to subpixels division. | *4* |

__Usage__:
```scss
font-size: rem(18);
```

#### em

It provides a *px* to *em* conversion.

__Definition__:

```scss
em($px, $context, $threshold)
```

As it share the same arguments, look at *[rem](#rem)* to learn more about them.

__Usage__:

```scss
font-size: em(18);
```

💡 *[Confused About REM and EM?](https://j.eremy.net/confused-about-rem-and-em/)*
