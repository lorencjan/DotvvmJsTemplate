import { registerReactControl } from './dotvvm-react';
import Literal from './literal';
import Tooltip from './tooltip';

export default (context: any) => ({
    $controls: {
        literal: registerReactControl(Literal),
        tooltip: registerReactControl(Tooltip)
    }
})
