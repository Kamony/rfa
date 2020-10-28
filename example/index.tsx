import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {RFA} from "../.";

const App = () => {
  return (
    <div>
        <RFA />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
