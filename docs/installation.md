---
layout: page
title: First Steps
permalink: /installation/
---

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


Check out [Components](../components)
{: style="font-size: 120%; text-align: center; margin-top: 100px"}
