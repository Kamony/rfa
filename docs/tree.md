---
layout: page
title: Tree
permalink: /tree/
---

**RFA** offers convenient way to [create](#define), [fill](#fill) and [display](#display) structured data in the form of the Tree form element.
 Tree is part of form with the same functionality as other form fields. There are some neat [features](#traverse-with-ease) to check out.

# Define

use [Form Architect](components#form-architect) to build a form with the [Tree](components#Tree) and define 
a Tree Node in attributes editor. Tree Node has a name and optional (key, value) payload data, that can be prefilled and static. 
There is a option to let user define additional data when filling the form.

![Tree Build](../assets/images/Tree_buld.png){:class="img-responsive"}

# Fill

use [Form Renderer](components#form-renderer) to render a form with the Tree and let user create a form based on defined attributes. 

![Tree Form](../assets/images/Tree_form.png){:class="img-responsive"}

# Display
whereas displaying form submitted data is out of scope of **RFA**, there is [Tree](components#Tree) component available
for displaying a tree 

![Tree Render](../assets/images/Tree.png){:class="img-responsive"}

# Traverse with ease
[Tree](components#Tree) component has a number of features to make traversing a long tree more pleasant. 
 Node children can be hide/shown and there are node anchors to swiftly see current node ancestors
  with option to quickly scroll to them.

![Tree Traversal](../assets/images/tree-traversal.gif){:class="img-responsive"}

# Search and Select
You can search for particular node inside of the [Tree](components#Tree) and select the node for further processing.
When searching, query can be compared witch node label or node content or both. Partial results can be set.


Check out [Components](../components) to learn more about API
{: style="font-size: 120%; text-align: center; margin-top: 100px"}

