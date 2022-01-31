const {
    lighten, darken,
    desaturate, saturate,
    rotate,
    mix,
    createPalette, createPaletteStop,
} = require('../../dist');

const baseColor = '#2b99ea'; console.log(baseColor);
const darkenColor = darken(baseColor, 15); console.log(darkenColor.toHex());
const lightenColor = lighten(baseColor, 15); console.log(lightenColor.toHex());
const lessSaturatedColor = desaturate(baseColor, 15); console.log(lessSaturatedColor.toHex());
const moreSaturatedColor = saturate(baseColor, 15); console.log(moreSaturatedColor.toHex());
const rotatedColor = rotate(baseColor, -90); console.log(rotatedColor.toHex());
const mixedColor = mix(baseColor, '#f00', 0.5); console.log(mixedColor.toHex());

const baseColor100 = createPaletteStop(baseColor, 100);
console.log(baseColor100.toHex());
const paletteDefault = Object.values(createPalette(baseColor)).map((color) => color.toHex());
console.log(paletteDefault);

const paletteRoundIn = Object.values(createPalette('#d7453a', 'roundIn')).map((color) => color.toHex()); console.log(paletteRoundIn);
const paletteRoundOut = Object.values(createPalette('#d7453a', 'roundOut')).map((color) => color.toHex()); console.log(paletteRoundOut);
const paletteRoundInOut = Object.values(createPalette('#d7453a', 'roundInOut')).map((color) => color.toHex()); console.log(paletteRoundInOut);