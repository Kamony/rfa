import * as React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Button, Grid, ThemeOptions } from '@material-ui/core';

import { FieldBox } from './field-box';
import { DropArea } from './drop-area';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { FormElement, formElements } from '../model';
import { IState, useStore } from '../store/store';

type FormArchitectProps = {
  onSave: (formData: IState) => void;
  theme?: ThemeOptions;
  formElements?: FormElement[];

  children?: never;
};

export const FormArchitect = (props: FormArchitectProps) => {
  const [store] = useStore((s) => s);
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

  const handleSave = React.useCallback(() => {
    props.onSave(store);
  }, [store]);

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
            <Button variant={'contained'} onClick={handleSave}>
              Save Form
            </Button>
          </Grid>
        </Grid>
      </ThemeProvider>
    </DndProvider>
  );
};
