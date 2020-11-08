import { initialState, FormSchemaType } from './store';
import type { StoreActions } from 'react-simple-hook-store';

export type StoreGlobalActions = {
  setStore: (newStore: FormSchemaType) => void;
  clearStore: () => void;
};

export const storeActions: StoreActions<FormSchemaType, StoreGlobalActions> = {
  setStore: (store, newStore) => {
    store.setState({
      elements: newStore.elements,
      grouping: newStore.grouping,
    });
  },
  clearStore: (store) => {
    store.setState(initialState);
  },
};
