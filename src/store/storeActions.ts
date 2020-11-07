import { initialState, IState } from './store';
import type { StoreActions } from 'react-simple-hook-store';

export type StoreGlobalActions = {
  setStore: (newStore: IState) => void;
  clearStore: () => void;
};

export const storeActions: StoreActions<IState, StoreGlobalActions> = {
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
