// import * as Less from "@types/less";

import { RgbaColor } from "colord";

// declare namespace Complimentary {
//     type LessFunction = (...args) => string;

//     interface Functions {
//         add: (name: string, callback: LessFunction) => void;
//     }

//     interface Plugin {
//         install: (less: LessStatic, pluginManager: Less.PluginManager, functions: Functions) => void;
//         minVersion?: [number, number, number] | undefined;
//     }
// }

// export const FC: (typeof Complimentary & typeof Less) = Less as any;

export type InternalColor = {
    rgba: RgbaColor;
    hex: string;
}

export { AnyColor, LabaColor, LchaColor, RgbaColor } from "colord";

export namespace Less {
    export type RgbColor = [number, number, number];

    export type ColorObject = {
        color: RgbColor;
        alpha: number;
    }

    export type PluginFunction = (...args: never) => AnyNode;

    export interface PluginFunctions {
        add: (name: string, callback: PluginFunction) => void;
    }

    export interface NodeColor {
        new (color: RgbColor, alpha: number): NodeColor;

        rgb: RgbColor;
        alpha: number;
        value: string;

        parent?: AnyNode;
    }

    export interface NodeUnit {
        numerator: Array<string>;
        denominator: Array<string>;
        backupUnit: string;
        parent: NodeValue;
    }

    export interface NodeValue {
        value: number;
        unit: NodeUnit;
    }

    export type AnyNode = NodeColor | NodeValue | NodeUnit;

    export interface Tree {
        Color: NodeColor;
    }

    export interface Static {
        tree: Tree;
    }
}
