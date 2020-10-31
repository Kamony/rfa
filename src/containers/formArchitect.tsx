import * as React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Grid, ThemeOptions } from '@material-ui/core';

import { FieldBox } from './field-box';
import { DropArea } from './drop-area';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { FormElement, formElements } from '../model';

type FormArchitectProps = {
  theme?: ThemeOptions;
  formElements?: FormElement[];

  children?: never;
};

export const FormArchitect = (props: FormArchitectProps) => {
  const Theme = React.useMemo(
    () =>
      createMuiTheme({
        ...props.theme,
      }),
    []
  );

  const FormElements: FormElement[] = React.useMemo(
    () => [...formElements, ...(props.formElements ?? [])],
    []
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Grid container direction={'row'} spacing={1} justify={'center'}>
          <Grid item xs={3}>
            <FieldBox formElements={FormElements} />
          </Grid>
          <Grid item xs={9}>
            <DropArea />
          </Grid>
        </Grid>
      </ThemeProvider>
    </DndProvider>
  );
};
