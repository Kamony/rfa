import React from 'react';
import renderer from 'react-test-renderer';
import {
  CheckBox,
  NumberInput,
  Radio,
  Switch,
  TextInput,
} from '../src/components/form-components';
import { Tree } from '../src';

test('Form Text', () => {
  const component = renderer.create(
    <TextInput register={jest.fn()} name={'text'} label={'text'} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('Form Number', () => {
  const component = renderer.create(
    <NumberInput register={jest.fn()} name={'text'} label={'text'} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('Form Checkbox', () => {
  const component = renderer.create(
    <CheckBox options={[]} register={jest.fn()} name={'text'} label={'text'} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('Form Radio', () => {
  const component = renderer.create(
    <Radio options={[]} register={jest.fn()} name={'text'} label={'text'} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('Form Switch', () => {
  const component = renderer.create(
    <Switch register={jest.fn()} name={'text'} label={'text'} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('Form Tree', () => {
  const component = renderer.create(<Tree node={{ name: 'test' }} />);
  expect(component.toJSON()).toMatchSnapshot();
});
