---
layout: page
title: Components
permalink: /components/
---

# Form Architect

## Basic Usage
~~~ tsx
import { FormArchitect } from 'rfa';
import type { IState } from 'rfa';

const App = () => {

  const handleOnFormSave = (formData: IState) => {
    console.log(formData);
    // do something with form data
  };

  return (
    <div>
        <FormArchitect onSave={handleOnFormSave} />
    </div>
  );
};
~~~
## Props
~~~ ts
type FormArchitectProps = {
  onSave: (formData: IState) => void;
  theme?: ThemeOptions;
  formElements?: FormElement[];

  children?: never;
};
~~~

| name | type | required | description |
|:--------|:-------:|--------:| --------:|
| onSave   | (formData: IState) => void   | true   | Action on `save form` button. FormData is passed as parameter.|
| theme   | ThemeOptions   | false   | Adjusts styles of React Architect. Refer to [Material UI theming](https://material-ui.com/customization/default-theme/).|
|----
| formElements   | [FormElement](#formelement)[]   | false   | Specifies additional form fields.|
|=====

# Form Renderer


# Common Types

## FormElement
~~~ ts
type FormElement = {
  name: string; // default name of element
  label: string; // title of element in toolbox and architect
  description?: string; // subtitle of element in toolbox
  icon: React.ReactElement<any>; // icon of element in toolbox
  render: React.FC<any>; // Component to render inside form 
  attributes: AttributeSchema[]; // array of adjustable components attributes
  validators?: Validators[]; // array of validators for this element
  validationType: ValidationType; // specify validation type of element
  isCustomRegistered?: boolean; // whether to use custom context registration for this element
};
~~~
## AttributeSchema
~~~ ts
export type AttributeSchema = {
  name: string; // name of attribute
  type: 'input' | 'select' | 'radio' | 'switch' | 'checkbox' | 'options'; // for editing purposes of attribute
  label: string; // label in attribute editor
  value?: string | number | boolean | string[]; // default value of attribute
  options?: { //specify options for checkboxed, selects, etc.
    name: string;
  }[];
};

//examples
const optionAttr = {
  type: 'options',
  name: 'options',
  label: 'manage options',
  options: [{ name: 'opt1' }, { name: 'opt2' }, { name: 'opt3' }],
},
const placeholderAttr = {
  name: 'placeholder',
  type: 'input',
  label: 'placeholder',
  value: 'replace me with actual placeholder',
},
~~~

## ValidationType

specifies [yup](https://github.com/jquense/yup#api) validation type upon to build dynamic schema
~~~ ts
type ValidationType = 'string' | 'number' | 'array' | 'boolean'; //for setting validations
~~~

## Validators

specifies validation functions to be applied to a form element. Select only those compatible with **ValidaitonType** (available options described [here](https://github.com/jquense/yup#api)) 
~~~ ts
export type Validators =
  | 'required'
  | 'min'
  | 'max'
  | 'length'
  | 'matches'
  | 'email'
  | 'url'
  | 'moreThan'
  | 'lessThan'
  | 'positive'
  | 'negative'
  | 'integer';
~~~
