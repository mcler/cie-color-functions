const fs = require('fs');
const less = require('less');

const { CieColorFunctionsPlugin } = require('../dist/plugins/less');

less
    .render(fs.readFileSync('./examples/less/style.less', 'utf-8'), {
        plugins: [CieColorFunctionsPlugin],
    })
    .then(
        (output) => {
            console.log(output);
            fs.writeFileSync('./examples/less/style.css', output.css);
        },
        (error) => {
            console.log(error);
        },
    );
