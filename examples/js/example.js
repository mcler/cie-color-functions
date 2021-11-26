const { lighten, darken, desaturate, saturate, rotate, mix } = require('../../dist');

const baseColor = '#2b99ea'; console.log(baseColor);
const darkenColor = darken(baseColor, 15); console.log(darkenColor.hex);
const lightenColor = lighten(baseColor, 15); console.log(lightenColor.hex);
const lessSaturatedColor = desaturate(baseColor, 15); console.log(lessSaturatedColor.hex);
const moreSaturatedColor = saturate(baseColor, 15); console.log(moreSaturatedColor.hex);
const rotatedColor = rotate(baseColor, -90); console.log(rotatedColor.hex);
const mixedColor = mix(baseColor, '#f00', 0.5); console.log(mixedColor.hex);
