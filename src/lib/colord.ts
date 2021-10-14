import { extend } from 'colord';
// import a11yPlugin from 'colord/plugins/a11y';
import labPlugin from 'colord/plugins/lab';
import lchPlugin from 'colord/plugins/lch';
import mixPlugin from 'colord/plugins/mix';

extend([
    // a11yPlugin,
    labPlugin,
    lchPlugin,
    mixPlugin,
]);

export { colord } from "colord";
