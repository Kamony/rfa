import React from 'react';
import { List, Paper } from '@material-ui/core';
import { FormElement } from '../model';
import { DraggableField } from '../components';
import { useFormElements } from '../hooks';

type FieldBoxProps = {
  formElements: FormElement[];

  children?: never;
};

export const FieldBox = ({ formElements }: FieldBoxProps) => {
  const { createFormElement } = useFormElements();

  const handleClick = React.useCallback(
    (formElement: FormElement) => createFormElement(formElement),
    [createFormElement]
  );
  return (
    <Paper variant={'outlined'}>
      <List disablePadding dense>
        {formElements.map((formElement, i) => (
          <DraggableField
            key={i}
            formElement={formElement}
            onClick={() => handleClick(formElement)}
          />
        ))}
      </List>
    </Paper>
  );
};
