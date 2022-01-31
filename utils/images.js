const { writeFileSync } = require('fs');
const { createCanvas } = require('canvas');
const { colord } = require('colord');
const { createPalette } = require('../dist');

function drawPalette(name, palette, width = 830, height = 40) {
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    const colors = Object.entries(palette);
    const colorWidth = width / colors.length;
    colors.forEach(([stop, color], idx) => {
        const x = idx * colorWidth;

        context.fillStyle = color.toHex();
        context.fillRect(x, 0, colorWidth, height);

        context.fillStyle = colord(color).invert().toHex();
        context.font = 'bold 14px sans-serif';
        context.width = colorWidth;
        context.textAlign = 'left';
        context.fillText(String(stop), x + 5, height - 5, colorWidth);
    });

    const buffer = canvas.toBuffer('image/png');
    writeFileSync(`./images/${name}.png`, buffer);
}

const baseColor = '#b91e64';

const palettes = [
    { name: 'default', mixEasing: 'default' },
    { name: 'linear', mixEasing: 'linear' },
    { name: 'ease', mixEasing: 'ease' },
    { name: 'ease-in', mixEasing: 'easeIn' },
    { name: 'ease-out', mixEasing: 'easeOut' },
    { name: 'ease-in-out', mixEasing: 'easeInOut' },
    { name: 'ease-in-out-sine', mixEasing: 'easeInOutSine' },
];

palettes.forEach(({ name, mixEasing }) => {
    drawPalette(name, createPalette(baseColor, mixEasing));
});
