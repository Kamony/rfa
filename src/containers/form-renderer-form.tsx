import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { useValidationCreator } from '../hooks';
import { yupResolver } from '@hookform/resolvers/yup';

import type { FieldValues } from 'react-hook-form';
import type { FormSchemaType } from '../store/store';
import { useFormRenderer } from '../hooks/useFormRenderer';

type Props = {
  data: FormSchemaType;
  onSubmit: (data: FieldValues) => void;
};

export const FormRendererForm = ({ data, onSubmit }: Props) => {
  const {
    data: { ValidationSchema },
  } = useValidationCreator();

  const {
    handleSubmit,
    register,
    unregister,
    control,
    setValue,
    errors,
  } = useForm({
    resolver: yupResolver(ValidationSchema),
  });

  const {
    data: { GroupReducedElements },
    state: { shouldRenderGroups },
  } = useFormRenderer(data);

  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        {Object.entries(GroupReducedElements).map(
          ([groupName, elements], index) => (
            <Box id={'form-group'} key={index} className={classes.group}>
              {shouldRenderGroups && (
                <>
                  <Typography variant={'h5'} gutterBottom>
                    {groupName}
                  </Typography>
                </>
              )}
              <Paper
                variant={'outlined'}
                id={'form-group-content'}
                className={classes.groupContent}
              >
                {elements.map((element) => (
                  <Box
                    id={'form-element'}
                    key={element.id}
                    className={classes.formElement}
                  >
                    {React.createElement(element.render, {
                      ...{ register, unregister, control, setValue },
                      ...element.attributes,
                      name: element.name,
                      error: errors?.[element.name],
                    })}
                  </Box>
                ))}
              </Paper>
            </Box>
          )
        )}
      </Box>
      <Button variant={'contained'} type={'submit'}>
        submit
      </Button>
    </form>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    group: {
      paddingBottom: theme.spacing(3),
    },
    groupContent: {
      padding: theme.spacing(2),
    },
    formElement: {
      marginTop: theme.spacing(1.5),
      '&:nth-child(1)': {
        marginTop: 0,
      },
    },
  })
);
