import React from 'react';
import {
  CheckBoxOutlined as CheckBoxIcon,
  FormatColorTextOutlined as TextInputIcon,
  LinearScaleOutlined as SliderIcon,
  MenuOpenOutlined as SelectIcon,
  RadioButtonCheckedOutlined as RadioIcon,
  ToggleOnOutlined as SwitchIcon,
  Looks3Outlined as NumberIcon,
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
import {
  Email,
  Integer,
  Length,
  LessThan,
  Max,
  Min,
  MoreThan,
  Negative,
  Positive,
  Regex,
  Required,
  Url,
} from '../components/form-validators';

export type OptionType = {
  name: string;
};

export type AttributeValueType = string | number | boolean | string[];

export type AttributeSchema = {
  name: string;
  type: 'input' | 'select' | 'radio' | 'switch' | 'checkbox' | 'options'; // for editing purposes of attribute
  label: string;
  value?: AttributeValueType;
  options?: OptionType[];
};
export type ValidationType = 'string' | 'number' | 'array' | 'boolean'; //for setting validations

export type Validation = {
  type: string;
  params: any[];
};

export type FormElement = {
  name: string;
  label: string;
  description?: string;
  icon: React.ReactElement<any>;
  render: keyof typeof componentMapper;
  attributes: AttributeSchema[];
  validators?: (keyof typeof validatorsMapper)[];
  validationType: ValidationType;
  isReadOnly?: boolean;
  isCustomRegistered?: boolean;
};

export enum Components {
  INPUT = 'TextInput',
  NUMBER = 'NumberInput',
  CHECKBOX = 'CheckBox',
  RADIO = 'Radio',
  SELECT = 'Select',
  SELECTMULTI = 'SelectMulti',
  SWITCH = 'Switch',
  SLIDER = 'Slider',
}

export const componentMapper: Record<Components, React.FC<any>> = {
  [Components.INPUT]: TextInput,
  [Components.NUMBER]: NumberInput,
  [Components.CHECKBOX]: CheckBox,
  [Components.RADIO]: Radio,
  [Components.SELECT]: Select,
  [Components.SELECTMULTI]: SelectMulti,
  [Components.SWITCH]: Switch,
  [Components.SLIDER]: Slider,
};

export enum Validators {
  REQUIRED = 'required',
  MIN = 'min',
  MAX = 'max',
  LENGTH = 'length',
  REGEX = 'matches',
  EMAIL = 'email',
  URL = 'url',
  MORETHAN = 'moreThan',
  LESSTHAN = 'lessThan',
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  INTEGER = 'integer',
}

export const validatorsMapper: Record<Validators, React.FC<any>> = {
  [Validators.REQUIRED]: Required,
  [Validators.MIN]: Min,
  [Validators.MAX]: Max,
  [Validators.LENGTH]: Length,
  [Validators.REGEX]: Regex,
  [Validators.EMAIL]: Email,
  [Validators.URL]: Url,
  [Validators.MORETHAN]: MoreThan,
  [Validators.LESSTHAN]: LessThan,
  [Validators.POSITIVE]: Positive,
  [Validators.NEGATIVE]: Negative,
  [Validators.INTEGER]: Integer,
};

export const formElements: FormElement[] = [
  {
    name: 'text-input',
    label: 'Text',
    description: 'for names, addresses, passwords, urls...',
    icon: <TextInputIcon color={'secondary'} />,
    render: Components.INPUT,
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
        options: [{ name: 'text' }, { name: 'password' }, { name: 'email' }],
        value: 'text',
      },
    ],
    validationType: 'string',
    validators: [
      Validators.REQUIRED,
      Validators.MIN,
      Validators.MAX,
      Validators.LENGTH,
      Validators.REGEX,
      Validators.EMAIL,
      Validators.URL,
    ],
  },
  {
    name: 'number-input',
    label: 'Number',
    description: 'for ages, sums, counts...',
    icon: <NumberIcon color={'secondary'} />,
    render: Components.NUMBER,
    attributes: [
      { name: 'label', type: 'input', label: 'label', value: 'number label' },
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
      Validators.REQUIRED,
      Validators.MIN,
      Validators.MAX,
      Validators.LESSTHAN,
      Validators.MORETHAN,
      Validators.POSITIVE,
      Validators.NEGATIVE,
      Validators.INTEGER,
    ],
  },
  {
    name: 'checkbox',
    label: 'Checkbox',
    description: 'for selecting one or more options',
    icon: <CheckBoxIcon color={'secondary'} />,
    render: Components.CHECKBOX,
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
    validators: [Validators.REQUIRED],
  },
  {
    name: 'radio',
    label: 'Radio',
    description: 'for selecting one option',
    icon: <RadioIcon color={'secondary'} />,
    render: Components.RADIO,
    attributes: [
      { name: 'label', type: 'input', label: 'label', value: 'radio label' },
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
    validators: [Validators.REQUIRED],
  },
  {
    name: 'select',
    label: 'Select',
    description: 'for selecting one from numerous options',
    icon: <SelectIcon color={'secondary'} />,
    render: Components.SELECT,
    attributes: [
      { name: 'label', type: 'input', label: 'label', value: 'select label' },
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
    validators: [Validators.REQUIRED],
  },
  {
    name: 'multiSelect',
    label: 'Select - multiple options',
    description: 'for selecting one or more from numerous options',
    icon: <SelectIcon color={'secondary'} />,
    render: Components.SELECTMULTI,
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
    validators: [Validators.REQUIRED],
  },
  {
    name: 'switch',
    label: 'Switch',
    description: 'for simple yes or no answers',
    icon: <SwitchIcon color={'secondary'} />,
    render: Components.SWITCH,
    attributes: [
      { name: 'label', type: 'input', label: 'label', value: 'switch label' },
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
    render: Components.SLIDER,
    isCustomRegistered: true,
    attributes: [
      { name: 'label', type: 'input', label: 'label', value: 'slider label' },
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
      Validators.REQUIRED,
      Validators.MIN,
      Validators.MAX,
      Validators.LESSTHAN,
      Validators.MORETHAN,
      Validators.POSITIVE,
      Validators.NEGATIVE,
      Validators.INTEGER,
    ],
  },
];
