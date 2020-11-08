"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("react-app-polyfill/ie11");
var React = require("react");
var ReactDOM = require("react-dom");
var _1 = require("../.");
var Element = function () {
    return React.createElement("div", null, "I am new element");
};
console.log(Element.name);
var myElement = {
    render: Element,
    label: 'My Element',
    name: 'myElement',
    icon: React.createElement("div", null),
    attributes: [],
    validationType: 'string',
};
var App = function () {
    var _a = React.useState(), formData = _a[0], setFormData = _a[1];
    var handleOnFormSave = function (formData) {
        console.log(formData);
        setFormData(formData);
    };
    return (React.createElement("div", null,
        React.createElement("div", { style: { padding: 20 } },
            React.createElement(_1.FormArchitect, { onSave: handleOnFormSave, formElements: [myElement] })),
        formData && (React.createElement(_1.RFARenderer, { onSubmit: function (data) { return console.log(data); }, data: formData }))));
};
ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
//# sourceMappingURL=index.js.map