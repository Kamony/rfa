import { AttributeType, FormStoredElementType, FormSchemaType } from './store';
import { StoreActions } from 'react-simple-hook-store';
import { uuid } from '../utils/uuid';

export type IActions = {
  addFormElement: (element: FormStoredElementType) => void;
  addFormElementAtIndex: (
    element: FormStoredElementType,
    index: number
  ) => void;
  removeFormElement: (id: string) => void;
  copyFormElement: (id: string, name: string, position: number) => void;
  swapFormElements: (
    groupID: string,
    elementIndex: number,
    newPositionIndex: number
  ) => void;
  transferElement: (id: string, groupId: string) => void;
  setFormElementAttributes: (id: string, attrs: AttributeType) => void;
  setFormElementValidations: (id: string, validations: any) => void;
  setFormElementAttribute: <T extends keyof FormStoredElementType>(
    id: string,
    attribute: T,
    value: FormStoredElementType[T]
  ) => void;
};

export const formElementActions: StoreActions<FormSchemaType, IActions> = {
  addFormElement: (store, element) => {
    store.setState({
      elements: [...store.state.elements, element] as FormStoredElementType[],
    });
  },
  addFormElementAtIndex: (store, payload, index) => {
    const elements = [...store.state.elements] as FormStoredElementType[];
    elements.splice(index, 0, payload);
    store.setState({
      elements: elements,
    });
  },
  removeFormElement: (store, id) => {
    store.setState({
      elements: store.state.elements.filter(
        (el) => el.id !== id
      ) as FormStoredElementType[],
    });
  },
  copyFormElement: (store, id, name, position) => {
    const duplicateElement = store.state.elements.find(
      (el) => el.id === id
    ) as FormStoredElementType;
    duplicateElement.name = name;
    const index = store.state.elements.findIndex((el) => el.id === id);
    if (!duplicateElement) {
      return null;
    }
    const newElement = {
      ...duplicateElement,
      id: uuid(),
      groupPosition: position,
    };
    formElementActions.addFormElementAtIndex(store, newElement, index + 1);
    return null;
  },
  swapFormElements: (store, groupID, oldIndex, newIndex) => {
    const elements = store.state.elements.filter(
      (el) => el.groupID === groupID
    ) as FormStoredElementType[];
    const restElements = store.state.elements.filter(
      (el) => el.groupID !== groupID
    ) as FormStoredElementType[];
    const elementA = elements[oldIndex];
    const elementB = elements[newIndex];

    // swap group position indexes
    const index = elementA.groupPosition;
    elementA.groupPosition = elementB.groupPosition;
    elementB.groupPosition = index;

    elements.splice(oldIndex, 1, elementA);
    elements.splice(newIndex, 1, elementB);

    store.setState({
      elements: [
        ...elements.sort((a, b) => a.groupPosition - b.groupPosition),
        ...restElements,
      ],
    });
  },
  transferElement: (store, id, groupId) => {
    formElementActions.setFormElementAttribute(store, id, 'groupID', groupId);
  },
  setFormElementAttributes: (store, id, attrs) => {
    const elements = [...store.state.elements] as FormStoredElementType[];
    const element = elements.find((el) => el.id === id);
    const elementId = elements.findIndex((el) => el.id === id);
    if (!element) {
      return null;
    }
    const updatedElement = {
      ...element,
      attributes: { ...attrs },
    };
    elements.splice(elementId, 1, updatedElement);
    store.setState({
      elements: elements,
    });
    return null;
  },
  setFormElementValidations: (store, id, validations) => {
    const elements = [...store.state.elements] as FormStoredElementType[];
    const element = elements.find((el) => el.id === id);
    const elementId = elements.findIndex((el) => el.id === id);
    if (!element) {
      return null;
    }
    const updatedElement = {
      ...element,
      attributes: {
        ...element.attributes,
        ...{ required: validations.required },
      },
      validations: { ...validations },
    };
    elements.splice(elementId, 1, updatedElement);
    store.setState({
      elements: elements,
    });
    return null;
  },
  setFormElementAttribute: (store, id, attribute, value) => {
    const elements = [...store.state.elements] as FormStoredElementType[];
    const element = elements.find((el) => el.id === id);
    const elementId = elements.findIndex((el) => el.id === id);
    if (!element) {
      return null;
    }
    const updatedElement = {
      ...element,
      [attribute]: value,
    };
    elements.splice(elementId, 1, updatedElement);
    store.setState({
      elements: elements,
    });
    return null;
  },
};
