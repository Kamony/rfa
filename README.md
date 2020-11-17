# React Form Architect

**React Form Architect** is an ultimate solution for creating and rendering forms in React. 
Its main focus is to provide users with a tool to define, render and share a form in a browser.

All in a way that can be done by a non-programming being.

## => [documentation and examples](https://kamony.github.io/rfa/) <=


# Installation

To install **React Form Architect** to your project run command
~~~ bash
yarn add rfa
~~~
or
~~~ bash
npm i rfa
~~~

**React Form Architect** is completely written in Typescript, therefore all types are already bundled within the package 

# Using RFA
Minimal working example
~~~ tsx
import React from 'react';
import { FormRenderer, FormArchitect } from 'rfa';
import type { FormSchemaType } from 'rfa';

const App = () => {
  const [formData, setFormData] = React.useState<FormSchemaType>();
  const handleOnFormSave = (formSchema: FormSchemaType) => {
    console.log(formData);
    // do something with form data
  };

  return (
    <div>
        <FormArchitect onSave={handleOnFormSave} />
        {formData && (
            <FormRenderer onSubmit={(data) => console.log(data)} data={formData} />
        )}
    </div>
  );
};
~~~
