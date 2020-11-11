import React from 'react';
import { Button } from '@material-ui/core';
import { FormSchemaType, useStore } from '../store/store';

type Props = {
  onSave: (formScheme: FormSchemaType) => void;
};

export const FormArchitectSaveButton = ({ onSave }: Props) => {
  const [store] = useStore((s) => s);

  const handleSave = React.useCallback(() => {
    onSave(store);
  }, [store]);

  return (
    <Button
      color={'primary'}
      variant={'contained'}
      onClick={handleSave}
      disabled={!store.elements.length}
    >
      Save Form
    </Button>
  );
};
