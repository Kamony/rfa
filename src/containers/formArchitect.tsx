import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Button, Grid, Box } from '@material-ui/core';
import { FieldBox } from './field-box';
import { DropArea } from './drop-area';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { useStore } from '../store/store';
import {
  CheckBoxOutlined as CheckBoxIcon,
  FormatColorTextOutlined as TextInputIcon,
  LinearScaleOutlined as SliderIcon,
  Looks3Outlined as NumberIcon,
  MenuOpenOutlined as SelectIcon,
  RadioButtonCheckedOutlined as RadioIcon,
  ToggleOnOutlined as SwitchIcon,
} from '@material-ui/icons';
import {
  CheckBox,
  NumberInput,
  Radio,
  Select,
  SelectMulti,
  Slider,
  Switch,
  TextInput,
} from '../components/form-components';
import { useRfaDataConverter } from '../hooks/useRfaDataConverter';

import type { FormSchemaType } from '../store/store';
import type { FormElement } from '../model';
import type { ThemeOptions } from '@material-ui/core';

type FormArchitectProps = {
  onSave: (formData: FormSchemaType) => void;
  theme?: ThemeOptions;
  formElements?: FormElement[];

  children?: never;
};

export const FormArchitect = (props: FormArchitectProps) => {
  const [store] = useStore((s) => s);
  const {
    handlers: { registerComponents },
  } = useRfaDataConverter();
  const Theme = React.useMemo(
    () =>
      createMuiTheme({
        ...props.theme,
      }),
    []
  );

  const formElements: FormElement[] = React.useMemo(
    () => [
      {
        name: 'text-input',
        label: 'Text',
        description: 'for names, addresses, passwords, urls...',
        icon: <TextInputIcon color={'secondary'} />,
        render: TextInput,
        attributes: [
          { name: 'label', type: 'input', label: 'label', value: 'text label' },
          {
            name: 'placeholder',
            type: 'input',
            label: 'placeholder',
            value: 'text placeholder',
          },
          {
            name: 'helperText',
            type: 'input',
            label: 'helperText',
            value: 'helper text',
          },
          {
            name: 'type',
            type: 'select',
            label: 'type',
            options: [
              { name: 'text' },
              { name: 'password' },
              { name: 'email' },
            ],
            value: 'text',
          },
        ],
        validationType: 'string',
        validators: [
          'required',
          'min',
          'max',
          'length',
          'matches',
          'email',
          'url',
        ],
      },
      {
        name: 'number-input',
        label: 'Number',
        description: 'for ages, sums, counts...',
        icon: <NumberIcon color={'secondary'} />,
        render: NumberInput,
        attributes: [
          {
            name: 'label',
            type: 'input',
            label: 'label',
            value: 'number label',
          },
          {
            name: 'placeholder',
            type: 'input',
            label: 'placeholder',
            value: 'number placeholder',
          },
          {
            name: 'helperText',
            type: 'input',
            label: 'helperText',
            value: 'number helper text',
          },
        ],
        validationType: 'number',
        validators: [
          'required',
          'min',
          'max',
          'lessThan',
          'moreThan',
          'positive',
          'negative',
          'integer',
        ],
      },
      {
        name: 'checkbox',
        label: 'Checkbox',
        description: 'for selecting one or more options',
        icon: <CheckBoxIcon color={'secondary'} />,
        render: CheckBox,
        attributes: [
          {
            name: 'label',
            type: 'input',
            label: 'label',
            value: 'checkboxes label',
          },
          {
            name: 'helperText',
            type: 'input',
            label: 'helperText',
            value: 'checkboxes helper text',
          },
          {
            type: 'options',
            name: 'options',
            label: 'manage options',
            options: [{ name: 'opt1' }, { name: 'opt2' }, { name: 'opt3' }],
          },
        ],
        validationType: 'array',
        validators: ['required'],
      },
      {
        name: 'radio',
        label: 'Radio',
        description: 'for selecting one option',
        icon: <RadioIcon color={'secondary'} />,
        render: Radio,
        attributes: [
          {
            name: 'label',
            type: 'input',
            label: 'label',
            value: 'radio label',
          },
          {
            name: 'helperText',
            type: 'input',
            label: 'helperText',
            value: 'radio helper text',
          },
          {
            type: 'options',
            name: 'options',
            label: 'manage options',
            options: [{ name: 'opt1' }, { name: 'opt2' }, { name: 'opt3' }],
          },
        ],
        validationType: 'string',
        validators: ['required'],
      },
      {
        name: 'select',
        label: 'Select',
        description: 'for selecting one from numerous options',
        icon: <SelectIcon color={'secondary'} />,
        render: Select,
        attributes: [
          {
            name: 'label',
            type: 'input',
            label: 'label',
            value: 'select label',
          },
          {
            name: 'helperText',
            type: 'input',
            label: 'helperText',
            value: 'select helper text',
          },
          {
            type: 'options',
            name: 'options',
            label: 'manage options',
            options: [{ name: 'opt1' }, { name: 'opt2' }, { name: 'opt3' }],
          },
        ],
        validationType: 'string',
        validators: ['required'],
      },
      {
        name: 'multiSelect',
        label: 'Select - multiple options',
        description: 'for selecting one or more from numerous options',
        icon: <SelectIcon color={'secondary'} />,
        render: SelectMulti,
        attributes: [
          {
            name: 'label',
            type: 'input',
            label: 'label',
            value: 'multi select label',
          },
          {
            name: 'helperText',
            type: 'input',
            label: 'helperText',
            value: 'multi select helper text',
          },
          {
            type: 'options',
            name: 'options',
            label: 'manage options',
            options: [{ name: 'opt1' }, { name: 'opt2' }, { name: 'opt3' }],
          },
        ],
        validationType: 'array',
        validators: ['required'],
      },
      {
        name: 'switch',
        label: 'Switch',
        description: 'for simple yes or no answers',
        icon: <SwitchIcon color={'secondary'} />,
        render: Switch,
        attributes: [
          {
            name: 'label',
            type: 'input',
            label: 'label',
            value: 'switch label',
          },
          {
            name: 'helperText',
            type: 'input',
            label: 'helperText',
            value: 'switch helper text',
          },
        ],
        validationType: 'boolean',
      },
      {
        name: 'slider',
        label: 'Slider',
        description: 'for selecting a number interactively',
        icon: <SliderIcon color={'secondary'} />,
        render: Slider,
        isCustomRegistered: true,
        attributes: [
          {
            name: 'label',
            type: 'input',
            label: 'label',
            value: 'slider label',
          },
          { name: 'min', type: 'input', label: 'Min Value', value: 0 },
          { name: 'max', type: 'input', label: 'Max Value', value: 100 },
          { name: 'step', type: 'input', label: 'Step', value: 1 },
          {
            name: 'helperText',
            type: 'input',
            label: 'helperText',
            value: 'slider helper text',
          },
        ],
        validationType: 'number',
        validators: [
          'required',
          'min',
          'max',
          'lessThan',
          'moreThan',
          'positive',
          'negative',
          'integer',
        ],
      },
      ...(props.formElements ?? []),
    ],
    []
  );

  // added any additional components to store for consecutive form data export
  React.useEffect(() => {
    if (!props.formElements?.length || !registerComponents) {
      return;
    }
    registerComponents(props.formElements?.map((element) => element.render));
  }, [props.formElements, registerComponents]);

  const handleSave = React.useCallback(() => {
    props.onSave(store);
  }, [store]);

  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Grid container direction={'row'} spacing={1} justify={'center'}>
          <Grid item xs={9}>
            <DropArea />
          </Grid>
          <Grid item xs={3}>
            <FieldBox formElements={formElements} />
          </Grid>
        </Grid>
        <Box marginTop={1}>
          <Button
            color={'primary'}
            variant={'contained'}
            onClick={handleSave}
            disabled={!store.elements.length}
          >
            Save Form
          </Button>
        </Box>
      </ThemeProvider>
    </DndProvider>
  );
};
