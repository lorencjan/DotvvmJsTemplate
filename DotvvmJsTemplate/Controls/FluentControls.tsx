import { registerReactControl } from '../Common/lib/dotvvm-react';
import Literal from './Literal';
import Tooltip from './Tooltip';

export default (context: any) => ({
    $controls: {
        Literal: registerReactControl(Literal),
        Tooltip: registerReactControl(Tooltip)
    }
})
