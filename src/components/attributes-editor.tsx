import {
  Box,
  Button,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useFieldCreator, useFormElements, useNameGenerator } from '../hooks';
import { FormStoredElementType } from '../store/store';
import { Control, useForm } from 'react-hook-form';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    previewContainer: {
      position: 'relative',
      padding: theme.spacing(2),
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

type AttributesEditFieldProps = {
  element: FormStoredElementType;
};
export const AttributesEditor = (props: AttributesEditFieldProps) => {
  const {
    register,
    unregister,
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
  } = useForm({
    defaultValues: props.element.attributes,
  });
  const watcher = watch();
  const { createName } = useNameGenerator();
  const { getAttributeEditField } = useFieldCreator();
  const {
    setFormElementAttributes,
    setFormElementAttribute,
  } = useFormElements();
  const classes = useStyles();

  const handleSave = (data: any) => {
    delete data[props.element.name];
    if (data.label !== props.element.attributes.label) {
      //there has been name change
      if (props.element.name.toLowerCase() === 'tree') {
        setFormElementAttribute(
          props.element.id,
          'name',
          createName(data.label, 'tree')
        );
      } else {
        setFormElementAttribute(
          props.element.id,
          'name',
          createName(data.label)
        );
      }
    }
    setFormElementAttributes(props.element.id, data);
  };
  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <Paper
        className={classes.previewContainer}
        color={'grey'}
        variant={'outlined'}
      >
        <Typography color={'textPrimary'}>Preview</Typography>
        {React.createElement(props.element.render, {
          ...props.element.attributes,
          ...{ register, unregister, control, setValue, reset },
          ...watcher,
          name: props.element.name,
        })}
      </Paper>
      <Grid item container direction={'column'} spacing={2}>
        {props.element.attributeSchema.map((attr) => (
          <Grid item key={attr.name}>
            {getAttributeEditField(attr, { register }, control as Control)}
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
          Save Attributes
        </Button>
      </Box>
    </form>
  );
};
