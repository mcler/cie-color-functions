# 🌈 CIE Color Functions

[![npm package](https://img.shields.io/npm/v/@mcler/cie-color-functions.svg)](https://www.npmjs.org/package/@mcler/cie-color-functions)

**Human perceived color functions based on [CIE LAB](https://en.wikipedia.org/wiki/CIELAB_color_space)/[CIE LCH](https://en.wikipedia.org/wiki/CIELAB_color_space#Cylindrical_model) color spaces**

---

## Why?
Default color manipulation functions do not take into account color perception.

### Available functions:
- `lighten`
- `darken`
- `desaturate`
- `saturate`
- `rotate` or `spin`
- `mix`
- `createPalette` and `createPaletteStop`

Parsing and manipulations utilized via [Colord](https://github.com/omgovich/colord). All functions return `Colord` instance.

### Color Palettes

Color palette shades are generated via mixing with black and white. You can choose mixing strategy or even provide your own function.

#### Default
![Default](./images/default.png)

#### Linear
![Linear](./images/linear.png)

#### Ease
![Ease](./images/ease.png)

#### Ease In
![Ease In](./images/ease-in.png)

#### Ease Out
![Ease Out](./images/ease-in.png)

#### Ease In Out
![Ease In Out](./images/ease-in-out.png)

#### Ease In Out Sine
![Ease In Out Sine](./images/ease-in-out-sine.png)

## Usage

### Installation
```bash
npm i @mcler/cie-color-functions
```
or
```bash
yarn add @mcler/cie-color-functions
```

### As standalone functions

```js
import {
    lighten, darken,
    desaturate, saturate,
    rotate, mix,
    createPalette, createPaletteStop,
} from '@mcler/cie-color-functions';

const baseColor = '#2b99ea';
const darkenColor = darken(baseColor, 15); // #0073c0
const lightenColor = lighten(baseColor, 15); // #64c1ff
const desaturatedColor = desaturate(baseColor, 15); // #5e97d0
const moreSaturatedColor = saturate(baseColor, 15); // #009cff
const rotatedColor = rotate(baseColor, -90); // #00a77f
const mixedColor = mix(baseColor, '#f00', 0.5); // #c66f7a

const baseColor100 = createPaletteStop(baseColor, 100); // #cce0f9
const baseColorPalette = createPalette(baseColor); // Record<string, Colord>
```

### As Less plugin

#### cie.js:
```js
const { CieColorFunctionsPlugin } = require('@mcler/cie-color-functions/plugins/less');
module.exports = CieColorFunctionsPlugin;
```

#### style.less:
```less
@plugin "cie"; // means that plugin from `cie.js` is used
@base-color: #2b99ea;

.text {
    color: @base-color;
}

.text-light {
    color: cie_lighten(@base-color, 15%);
}

.text-dark {
    color: cie_darken(@base-color, 15%);
}

.text-desaturate {
    color: cie_desaturate(@base-color, 15%);
}

.text-saturate {
    color: cie_saturate(@base-color, 15%);
}

.text-rotate {
    color: cie_spin(@base-color, 120deg);
}

.text-mix {
    color: cie_mix(@base-color, #f00, 33%);
}

.text-50 {
    color: cie_palette_stop(@base-color, 50);
}

.text-300 {
    color: cie_palette_stop(@base-color, 300);
}
```

#### Output:
```css
.text {
    color: #2b99ea;
}

.text-light {
    color: #64c1ff;
}

.text-dark {
    color: #0073c0;
}

.text-desaturate {
    color: #5e97d0;
}

.text-saturate {
    color: #009cff;
}

.text-rotate {
    color: #e26a76;
}

.text-mix {
    color: #a97f9f;
}

.text-50 {
    color: #dfebfc;
}

.text-300 {
    color: #76b2f0;
}
```

## TODO
- [ ] PostCSS plugin
