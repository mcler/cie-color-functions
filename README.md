# 🌈 CIE Color Functions
**Human perceived color functions base on LAB/LCH color spaces**

---

Parsing and manipulations utilized via [Colord](https://github.com/omgovich/colord)

## Available functions
- lighten
- darken
- colorful
- rotate
- mix

## Usage
### As standalone functions

```js
import { lighten, darken, colorful, rotate, mix } from '@mcler/cie-color-functions';

const baseColor = '#2b99ea';
const darkenColor = darken(baseColor, 15); // #0073c0
const lightenColor = lighten(baseColor, 15); // #64c1ff
const lessColorfulColor = colorful(baseColor, -15); // #5e97d0
const moreColorfulColor = colorful(baseColor, 15); // #009cff
const rotatedColor = rotate(baseColor, -90); // #00a77f
const mixedColor = mix(baseColor, '#f00', 0.5); // #c66f7a
```

### As Less plugin

#### cie.js:
```js
const lessPlugin = require('@mcler/cie-color-functions/less');
module.exports = lessPlugin;
```
#### style.less:
```less
@plugin "cie";

@color-text: #2b99ea;

.text {
    color: @color-text;
}

.text-light {
    color: cie_lighten(@color-text, 15%);
}

.text-dark {
    color: cie_darken(@color-text, 15%);
}

.text-less-colorful {
    color: cie_colorful(@color-text, -15%);
}

.text-more-colorful {
    color: cie_colorful(@color-text, 15%);
}

.text-rotate {
    color: cie_rotate(@color-text, -90deg);
}

.text-mix {
    color: cie_mix(@color-text, #f00, 0.5);
}
```

## TODO
- [ ] Palettes generation
- [ ] Tests
- [ ] Sass plugin
- [ ] PostCSS plugin
