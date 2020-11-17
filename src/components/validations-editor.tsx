import {
  Box,
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React from 'react';
import { FormStoredElementType } from '../store/store';
import { useForm } from 'react-hook-form';
import { useFormElements, useValidationCreator } from '../hooks';
import { validatorsMapper } from '../model';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    validator: {
      marginBottom: theme.spacing(2),
    },
  })
);

type AttributesEditFieldProps = {
  element: FormStoredElementType;
};
export const ValidationsEditor = (props: AttributesEditFieldProps) => {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: props.element.validations,
  });
  useValidationCreator();
  const watcher = watch();
  const { handlers } = useFormElements();
  const classes = useStyles();

  const handleSave = (data: any) => {
    handlers.setFormElementValidations(props.element.id, data);
  };
  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <Grid item container direction={'column'} spacing={2}>
        {props.element.validators?.map((validator) => (
          <Grid item key={validator}>
            {React.createElement(validatorsMapper[validator], {
              register,
              disabledParam: !watcher[validator],
              name: validator,
              className: classes.validator,
            })}
          </Grid>
        ))}
      </Grid>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        p={3}
      >
        <Button variant={'contained'} color={'primary'} type={'submit'}>
          Save Validations
        </Button>
      </Box>
    </form>
  );
};
