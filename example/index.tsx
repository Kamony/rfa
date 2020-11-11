import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FormRenderer, FormArchitect } from '../.';
import type { FormSchemaType, FormElement } from '../.';

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

  const handleOnFormSave = (formData: FormSchemaType) => {
    console.log(formData);
    setFormData(formData);
  };

  return (
    <div>
      <div style={{ padding: 20 }}>
        <FormArchitect
          onSave={handleOnFormSave}
          theme={myTheme}
          formElements={[myElement]}
        />
      </div>
      {formData && (
        <FormRenderer
          onSubmit={(data) => console.log(data)}
          data={formData}
          theme={myTheme}
          fields={[Element]}
        />
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
