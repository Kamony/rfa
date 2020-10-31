import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, List, Paper, Typography } from '@material-ui/core';
import { FormElement } from '../model';
import { DraggableField } from '../components';
import { useFormElements } from '../hooks';

type FieldBoxProps = {
  formElements: FormElement[];

  children?: never;
};

const useStyles = makeStyles({
  container: {
    minHeight: 500,
  },
});

export const FieldBox = ({ formElements }: FieldBoxProps) => {
  const classes = useStyles();
  const { createFormElement } = useFormElements();

  const handleClick = React.useCallback(
    (formElement: FormElement) => createFormElement(formElement),
    [createFormElement]
  );
  console.log(formElements);
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Typography variant={'h5'} color={'primary'} gutterBottom>
        Form toolbox
      </Typography>
      <Paper className={classes.container} variant={'outlined'}>
        <List>
          {formElements.map((formElement, i) => (
            <DraggableField
              key={i}
              formElement={formElement}
              onClick={() => handleClick(formElement)}
            />
          ))}
        </List>
      </Paper>
    </Box>
  );
};
