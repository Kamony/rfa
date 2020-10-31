import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RFARenderer } from '../.';
import { FormArchitect } from '../.';
// @ts-ignore
import mockData from '../src/mock/mock.json';
const App = () => {
  return (
    <div>
      <div style={{ padding: 20 }}>
        <FormArchitect />
      </div>
      <RFARenderer onSubmit={(data) => console.log(data)} data={mockData} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
