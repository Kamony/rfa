import React from 'react';
import { useForm } from 'react-hook-form';
import { Box } from '@material-ui/core';
import { useFormElements } from '../hooks';
import { FormBuildElement } from '../components';

export const FormElementsContainer = () => {
  const { register, control, setValue, unregister } = useForm();
  const { elements } = useFormElements();
  return (
    <Box p={1} width={'100%'} height={'100%'}>
      <form>
        {elements.map((element, index) => (
          <FormBuildElement
            key={element.id}
            element={element}
            index={index}
            formContextRegistration={{
              register,
              control,
              setValue,
              unregister,
            }}
          />
        ))}
      </form>
    </Box>
  );
};
