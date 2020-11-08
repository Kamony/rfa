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

**React Form Architect** is completely written in typescript, therefore all types are already bundled within the package 

# Using RFA

~~~ tsx
import { FormRenderer, FormArchitect } from 'rfa';
import type { IState, FormElement } from 'rfa';

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
