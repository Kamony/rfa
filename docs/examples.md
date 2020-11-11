---
layout: page
title: Examples
permalink: /examples/
---

1. [Theming](#theming)
2. [Extending Form Elements](#extending-form-elements)

# Theming
Define a [Material UI Theme](https://material-ui.com/customization/default-theme/) and pass it to `theme` prop of [Form Renderer](components#form-renderer) and [Form Architect](components#form-architect)
~~~ tsx
const myTheme = {
  palette: {
    primary: {
      main: '#0d1821',
    },
    secondary: {
      main: '#344966',
    },
  },
};

// ... other code

<FormArchitect {...props} theme={myTheme} />
<FormRenderer {...props} theme={myTheme} />
~~~
# Extending Form Elements
To add a component to [Form Architect](components#form-architect) define a [FormElement](#formelement) and pass component as its `render` property.
Pass created `FormElement` as an array to `formElements` prop. 

If you pass data to [Form Renderer](components#form-renderer) as a JSON, don't forget to add any extended components to `fields` prop, otherwise this step is not required and components will be mapped from `render` property.  
~~~ tsx
const Element = () => {
  return <div>I am new element</div>;
};

const myElement: FormElement = {
  render: Element,
  label: 'My Element',
  name: 'myElement',
  icon: <div />,
  attributes: [],
  validationType: 'string',
};


// ... other code

<FormArchitect {...props} formElements={[myElement]} />
<FormRenderer {...props} fields={[Element]} />
~~~
