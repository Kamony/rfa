import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FormArchitect, FormRenderer } from '../src/containers';
import { Tree } from '../src';
// @ts-ignore
import mockData from '../src/mock/mock.json';
// @ts-ignore
import { setupIntersectionObserverMock } from './utilities';

describe('it', () => {
  beforeAll(() => {
    setupIntersectionObserverMock();
  });
  it('renders Architect without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FormArchitect onSave={jest.fn()} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders Renderer without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FormRenderer data={mockData} onSubmit={jest.fn()} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders Tree without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Tree node={{ name: 'Testing Node' }} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
