import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FormRenderer, FormArchitect } from '../.';
import type { FormSchemaType, FormElement } from '../.';
import { Tree } from '../src';

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

const myTheme = {
  palette: {
    primary: {
      main: '#23967F',
    },
    secondary: {
      main: '#78BC61',
    },
  },
};

const App = () => {
  const [formData, setFormData] = React.useState<FormSchemaType>();
  const [submitData, setSubmitData] = React.useState<any>();
  const [tree, setTree] = React.useState<any>();

  const handleOnFormSave = (formData: FormSchemaType) => {
    console.log(formData);
    setFormData(formData);
  };

  const handleFormSubmit = (data) => {
    console.log(data);
    setTree(null);
    setSubmitData(data);
    const treeData: any = [];
    Object.entries(data).forEach(([key, value]) => {
      if (key.includes('tree')) {
        treeData.push(value);
      }
    });
    setTree(treeData);
  };

  console.log({ tree, submitData });
  const TreeData = React.useMemo(() => {
    if (!submitData) {
      return;
    }
    console.log({ SUBMITTED_DATA: submitData });
    const data: any = [];
    Object.entries(submitData).forEach(([key, value]) => {
      if (key.includes('tree')) {
        data.push(value);
      }
    });
    return data;
  }, [submitData]);

  return (
    <div>
      <div style={{ padding: 20 }}>
        <h1>FormArchitect</h1>
        <FormArchitect onSave={handleOnFormSave} />
        <div style={{ paddingTop: 50 }}>
          <h1>FormRenderer</h1>
          {formData && (
            <FormRenderer onSubmit={handleFormSubmit} data={formData} />
          )}
        </div>
        <div style={{ paddingTop: 50 }}>
          <h1>Tree</h1>
          {tree &&
            tree.length &&
            tree.map((node, i) => (
              <Tree
                node={node}
                key={i}
                searchable={true}
                onNodeSelect={(data) => console.log(data)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
