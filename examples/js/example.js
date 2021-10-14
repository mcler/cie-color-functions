const { lighten, darken, colorful, rotate, mix } = require('../../src');

const baseColor = '#2b99ea'; console.log(baseColor);
const darkenColor = darken(baseColor, 15); console.log(darkenColor.hex);
const lightenColor = lighten(baseColor, 15); console.log(lightenColor.hex);
const lessColorfulColor = colorful(baseColor, -15); console.log(lessColorfulColor.hex);
const moreColorfulColor = colorful(baseColor, 15); console.log(moreColorfulColor.hex);
const rotatedColor = rotate(baseColor, -90); console.log(rotatedColor.hex);
const mixedColor = mix(baseColor, '#f00', 0.5); console.log(mixedColor.hex);
