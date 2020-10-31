import React from 'react';
import { IState } from '../store/store';
import { FieldValues, useForm } from 'react-hook-form';
import { componentMapper } from '../model';
import {
  Box,
  Button,
  Container,
  createStyles,
  CssBaseline,
  makeStyles,
  Paper,
  Theme,
  ThemeOptions,
  ThemeProvider,
  Typography,
} from '@material-ui/core';
import { useValidationCreator } from '../hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFormRenderer } from '../hooks/useFormRenderer';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

type Props = {
  data: IState;
  onSubmit: (data: FieldValues) => void;
  theme?: ThemeOptions;
};

export const RFARenderer = ({ data, onSubmit, theme }: Props) => {
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

  const Theme: Theme = React.useMemo(
    () =>
      createMuiTheme({
        ...theme,
      }),
    []
  );

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Container maxWidth={'xl'}>
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
                        {React.createElement(componentMapper[element.render], {
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
      </Container>
    </ThemeProvider>
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
