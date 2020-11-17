---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: home
---

<style type="text/css">
.iframe_container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 - this is responsive by adjusting the height according to the width! */
    padding-top: 25px;
    height: 0;
}

.iframe_container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>

**React Form Architect** is a solution for creating and rendering forms in React. 
Its main focus is to provide users with a tool to define, render and share a form in a browser.

All in a way that can be done by a non-programming being in a plug and play way without an extensive configuration.

## Motivation
**RFA** was created for scientists to define the data types of their findings using a form.
 Other researchers can then add defined findings by filling out the form. All done in a browser without the need of any additional programming work.
Check out [UniCatDB](https://www.unicatdb.org/) for real-life usage. There is the [Tree](tree) form field added especially for scientists for working with tree-structured data.

Due to the dynamic nature of the solution, **RFA** will also find much wider use in any environment where form needs to be created and/or rendered. 

RFA works pretty well with NoSql databases for creating dynamic data types.

## Why to use RFA

* User testing preceded the development - RFA was built for users with **UX in mind**.
* Offers the **extensive palette of form fields** - includes all the essential form arsenal. 
* For simple and **complex forms** - fields can be **grouped** together and **ordered** as desired.
* **Validations** included - schema validation is dynamically created upon form creation.
* **Themeable** - fits to your environment.
* **Extendable** - new form fields can be defined for your specific need.
* **Transferable** - form scheme can be exported and imported at will using JSON.
* **Full package** - define form using [Form Architect](components#form-architect) and render form using [Form Renderer](components#form-renderer).
* **Decoupled functionality** - [create form](components#form-architect) in one place and [render](components#form-renderer) it elsewhere (even in different project, computer, planet).
* **Serverless** - all magic is happening on the frontend.
* **Science** ready - added functionality especially for scientists for working with tree-structured data ([Tree](tree)).
* Built using **modern stack** - React with hooks, Typescript, React Hook Form, Yup, Material-UI
* Made with **love** 

## Create Form
Use [Form Architect](components#form-architect) to create form, edit, group and order form fields and set validations.
Upon completion generate form schema.  

## Render Form
Use form schema to render a form for your users using [Form Renderer](components#form-renderer).
 Define what to do with fill out data. That's it. No other actions needed.

## Try it out!
open example in a [new window](https://nnsrp.csb.app/) to overcome limitations of this example iframe (drag and drop doesn't work)
<div class="iframe_container">
    <iframe src="https://codesandbox.io/embed/twilight-mountain-nnsrp?fontsize=8&hidenavigation=1&theme=light&view=preview"
         style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
         title="twilight-mountain-nnsrp"
         allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
         sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
       ></iframe>
</div>

Make your [First Steps](installation) with **RFA**
{: style="font-size: 120%; text-align: center; margin-top: 100px"}
