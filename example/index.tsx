import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FormRenderer, FormArchitect } from '../.';
import type { IState, FormElement } from '../.';

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

const App = () => {
  const [formData, setFormData] = React.useState<IState>();

  const handleOnFormSave = (formData: IState) => {
    console.log(formData);
    setFormData(formData);
  };

  return (
    <div>
      <div style={{ padding: 20 }}>
        <FormArchitect onSave={handleOnFormSave} />
      </div>
      {formData && (
        <FormRenderer onSubmit={(data) => console.log(data)} data={formData} />
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
