import React from 'react';
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
  render: React.FC<any>;
  attributes: AttributeSchema[];
  validators?: Validators[];
  validationType: ValidationType;
  isReadOnly?: boolean;
  isCustomRegistered?: boolean;
};

export type Validators =
  | 'required'
  | 'min'
  | 'max'
  | 'length'
  | 'matches'
  | 'email'
  | 'url'
  | 'moreThan'
  | 'lessThan'
  | 'positive'
  | 'negative'
  | 'integer';

export const validatorsMapper: Record<Validators, React.FC<any>> = {
  required: Required,
  min: Min,
  max: Max,
  length: Length,
  matches: Regex,
  email: Email,
  url: Url,
  moreThan: MoreThan,
  lessThan: LessThan,
  positive: Positive,
  negative: Negative,
  integer: Integer,
};
