import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RFA } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RFA />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
