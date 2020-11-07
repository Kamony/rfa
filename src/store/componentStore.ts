import React from 'react';
import { createStore, StoreActions } from 'react-simple-hook-store';
import {
  CheckBox,
  NumberInput,
  Radio,
  Select,
  SelectMulti,
  Slider,
  Switch,
  TextInput,
} from '../components/form-components';

type State = {
  components: React.FC<any>[];
};
type Actions = {
  addComponents: (components: React.FC<any>[]) => void;
};

export const initialState: State = {
  components: [
    TextInput,
    NumberInput,
    CheckBox,
    Radio,
    Select,
    SelectMulti,
    Switch,
    Slider,
  ],
};

const actions: StoreActions<State, Actions> = {
  addComponents: (store, components) => {
    store.setState({
      ...store.state,
      components: [...store.state.components, ...components],
    });
  },
};

export const {
  useStore: useComponentStore,
  store: componentStore,
} = createStore(initialState, actions);
