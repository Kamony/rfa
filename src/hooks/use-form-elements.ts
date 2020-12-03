import React from 'react';
import { useStore } from '../store/store';
import { useNameGenerator } from './use-name-generator';
import { FormElement } from '../model';
import { uuid } from '../utils/uuid';

export const useFormElements = () => {
  const [elements, actions] = useStore(
    (s) => s.elements,
    (a) => a.formElementsActions
  );

  const [activeGroupId] = useStore(
    (s) => s.grouping.activeGroup,
    () => null
  );

  const { createName } = useNameGenerator();

  const groupReducedElements = React.useMemo(
    () => elements.filter((el) => el.groupID === activeGroupId),
    [elements, activeGroupId]
  );

  const lastGroupPositionIndex = React.useMemo(
    () =>
      groupReducedElements.length > 0
        ? Math.max(...groupReducedElements.map((el) => el.groupPosition))
        : 0,
    [groupReducedElements]
  );

  const createFormElement = React.useCallback(
    (formElement: FormElement) => {
      const id = uuid();
      const attrs = formElement.attributes.reduce((accumulator, attrObj) => {
        if (attrObj.options && attrObj.type === 'options') {
          return {
            ...accumulator,
            [attrObj.name]: attrObj.options,
          };
        }

        if (attrObj.keyValueData && attrObj.type === 'keyValueData') {
          return {
            ...accumulator,
            [attrObj.name]: attrObj.keyValueData,
          };
        }

        return {
          ...accumulator,
          [attrObj.name]: attrObj.value,
        };
      }, {});

      actions.addFormElement({
        id,
        label: formElement.label,
        name: createName(formElement.label),
        attributeSchema: formElement.attributes,
        attributes: attrs,
        render: formElement.render,
        isCustomRegistered: formElement.isCustomRegistered,
        groupID: activeGroupId,
        groupPosition: lastGroupPositionIndex + 1,
        isReadOnly: formElement.isReadOnly,
        validations: {},
        validationType: formElement.validationType,
        validators: formElement.validators,
      });
    },
    [actions, activeGroupId, createName, lastGroupPositionIndex]
  );

  const setFormElementAttributes = React.useCallback(
    (...params: Parameters<typeof actions.setFormElementAttributes>) => {
      actions.setFormElementAttributes(...params);
    },
    [actions]
  );

  const setFormElementAttribute = React.useCallback(
    (...params: Parameters<typeof actions.setFormElementAttribute>) => {
      actions.setFormElementAttribute(...params);
    },
    [actions]
  );

  const setFormElementValidations = React.useCallback(
    (...params: Parameters<typeof actions.setFormElementValidations>) => {
      actions.setFormElementValidations(...params);
    },
    [actions]
  );

  return {
    elements: groupReducedElements,
    allElements: elements,
    createFormElement,
    setFormElementAttributes,
    setFormElementAttribute,
    handlers: {
      setFormElementValidations,
    },
    state: {
      lastGroupPositionIndex,
    },
  };
};
