import { createStore } from 'react-simple-hook-store';
import { formElementActions } from './form-element-actions';
import {
  AttributeSchema,
  AttributeValueType,
  FormElement,
  ValidationType,
  Validators,
} from '../model';
import { groupingActions } from './grouping-actions';
import { uuid } from '../utils/uuid';
import { storeActions } from './storeActions';

export type AttributeType = { [key: string]: AttributeValueType };

export type FormStoredElementType = {
  id: string; // id used for internal store cause
  name: string; // form context name
  label: string; // label of builder element
  attributeSchema: AttributeSchema[]; // attributes schema for component customization
  attributes: AttributeType; // attributes passed directly to component
  validations: { [key: string]: any }; // validations entries used to build schema
  validationType: ValidationType; // validations entries used to build schema
  validators?: Validators[]; // validators to assign to this form field
  render: FormElement['render'];
  groupPosition: number; // form element position index inside of group
  groupID: GroupType['id']; // id of group this element is assigned to
  isCustomRegistered?: FormElement['isCustomRegistered']; // wheter to take control of form context propagation
  isReadOnly?: boolean; // whether is editable or read only
};

export type GroupType = {
  name: string; // name of group
  id: string; // id used for internal store cause
};

export interface FormSchemaType {
  elements: FormStoredElementType[];
  grouping: {
    groups: GroupType[];
    activeGroup: string;
  };
}
export const defaultGroupID = uuid();

export const initialState: FormSchemaType = {
  elements: [],
  grouping: {
    groups: [{ id: defaultGroupID, name: 'default group' }],
    activeGroup: defaultGroupID,
  },
};

export const { useStore, store } = createStore(initialState, {
  formElementsActions: formElementActions,
  groupingActions: groupingActions,
  storeActions: storeActions,
});
