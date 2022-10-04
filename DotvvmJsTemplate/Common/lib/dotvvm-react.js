import * as React from 'react';
import * as ReactDOM from 'react-dom';
/** React wrapper for knockout `ko.renderTemplate` function.
 * Specify the `templateName` property to select which template should be rendered.
 * Optionally, you can use the `viewModel` or `getChildContext` property to set a data context for the template. */
export class KnockoutTemplateReactComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.wrapRef = React.createRef();
        this.templateName = ko.observable();
    }
    // TODO: how to dispose the template?
    // componentWillUnmount() {
    // }
    componentDidMount() {
        setTimeout(() => this.initializeTemplate(), 5);
    }
    initializeTemplate() {
        const dotvvm = window["dotvvm"];
        const e = this.wrapRef.current;
        let context = ko.contextFor(e);
        if (this.props.getChildContext) {
            context = this.props.getChildContext(context);
        }
        else if (this.props.viewModel !== undefined) {
            const updateEvent = new dotvvm.DotvvmEvent("templateInReact.newState");
            this.viewModelStateManager = new dotvvm.StateManager(this.props.viewModel, updateEvent);
            context = context.createChildContext(this.viewModelStateManager.stateObservable);
        }
        this.updateStuff();
        ko.renderTemplate(this.templateName, context, {}, e);
    }
    componentDidUpdate() {
        this.updateStuff();
    }
    updateStuff() {
        if (this.templateName() !== this.props.templateName)
            this.templateName(this.props.templateName);
        if (this.viewModelStateManager) {
            this.viewModelStateManager.setState(this.props.viewModel);
        }
    }
    render() {
        return React.createElement(this.props.wrapperTag, { ref: this.wrapRef });
    }
}
KnockoutTemplateReactComponent.defaultProps = {
    wrapperTag: "div"
};
export const registerReactControl = (ReactControl, defaultProps = {}) => ({
    create: (elm, props, commands, templates, setProps) => {
        const initialProps = Object.assign(Object.assign(Object.assign(Object.assign({}, defaultProps), commands), templates), { setProps });
        let currentProps = Object.assign(Object.assign({}, initialProps), props);
        ReactDOM.render(React.createElement(ReactControl, Object.assign({}, currentProps)), elm);
        return {
            updateProps(updatedProps) {
                currentProps = Object.assign(Object.assign({}, currentProps), updatedProps);
                ReactDOM.render(React.createElement(ReactControl, Object.assign({}, currentProps)), elm);
            },
            dispose() {
                ReactDOM.unmountComponentAtNode(elm);
            }
        };
    }
});
