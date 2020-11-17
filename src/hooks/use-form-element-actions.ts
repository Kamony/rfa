import { useStore } from '../store/store';
import React from 'react';
import { useNameGenerator } from './use-name-generator';
import { useFormElements } from './use-form-elements';

export const useFormElementActions = (formElementId: string) => {
  const [, actions] = useStore(
    () => null,
    (a) => a.formElementsActions
  );
  const {
    state: { lastGroupPositionIndex },
  } = useFormElements();
  const { createNameById } = useNameGenerator();

  const removeElement = React.useCallback(() => {
    actions.removeFormElement(formElementId);
  }, [actions, formElementId]);

  const copyElement = React.useCallback(() => {
    actions.copyFormElement(
      formElementId,
      createNameById(formElementId),
      lastGroupPositionIndex + 1
    );
  }, [actions, createNameById, formElementId, lastGroupPositionIndex]);

  const swapElement = React.useCallback(
    (groupID: string) => (indexA: number, indexB: number) => {
      actions.swapFormElements(groupID, indexA, indexB);
    },
    [actions]
  );

  const transferElement = React.useCallback(
    (groupId: string) => {
      actions.transferElement(formElementId, groupId);
    },
    [actions, formElementId]
  );

  return {
    removeElement,
    copyElement,
    swapElement,
    transferElement,
  };
};
