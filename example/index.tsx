import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RFARenderer } from '../.';
import { FormArchitect } from '../.';

import type { IState } from '../.';

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
        <RFARenderer onSubmit={(data) => console.log(data)} data={formData} />
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
