import * as React from 'react';
import { TooltipHost, ITooltipHostStyles } from '@fluentui/react';
import { KnockoutTemplateReactComponent } from '../Common/lib/dotvvm-react';

type TooltipProps = {
    text: string;
    content: any;
}

const Tooltip: React.FC<TooltipProps> = ({text, content}) => {
    const tooltipStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } };
    const calloutProps = { gapSpace: 0 };

    return <TooltipHost content={text} calloutProps={calloutProps} styles={tooltipStyles}>
        <KnockoutTemplateReactComponent templateName={content} />
    </TooltipHost>;
}

export default Tooltip;