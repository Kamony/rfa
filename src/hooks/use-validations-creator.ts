import React from 'react';
import * as yup from 'yup';
import { Validation, ValidationType } from '../model';
import { useFormElements } from './use-form-elements';
import { FormStoredElementType } from '../store/store';

export const useValidationCreator = () => {
  const { allElements } = useFormElements();

  const ElementsValidations = React.useMemo(
    () =>
      allElements
        .filter((el) => JSON.stringify(el.validations) !== '{}')
        .reduce(
          (acc, el) => ({
            ...acc,
            [el.name]: createValidationFieldSchema(
              getMappedValidations(el.validations),
              el.validationType
            ),
          }),
          {}
        ),
    [allElements]
  );

  const ValidationSchema = React.useMemo(
    () => yup.object().shape(ElementsValidations),
    [ElementsValidations]
  );

  return {
    data: { ValidationSchema },
  };
};

export const getMappedValidations = (
  values: FormStoredElementType['validations']
): Validation[] => {
  let validations: Validation[] = [];
  Object.entries(values).forEach(([key, value]: [any, any]) => {
    if (!value) {
      return;
    }
    if (!key.includes('ErrorMessage')) {
      let validation: Validation;
      if (key === 'type') {
        validation = {
          type: values[key],
          params: [values[`${key}ErrorMessage`]],
        };
      } else {
        validation = {
          type: key,
          params: [values[`${key}ErrorMessage`]],
        };
        if (value && typeof value !== 'boolean') {
          validation.params.unshift(value);
        }
      }

      if (!(typeof value === 'boolean' && !value)) {
        validations.push(validation);
      }
    }
  });
  return validations;
};

export const createValidationFieldSchema = (
  validations: Validation[],
  validationType: ValidationType
) => {
  let fieldSchema: any = new (yup as any)[validationType]().nullable();
  validations.forEach((validation) => {
    const { params, type } = validation;
    if (!fieldSchema[type]) {
      return;
    }
    fieldSchema = fieldSchema[type](...params);
  });

  if (validationType === 'number') {
    fieldSchema = fieldSchema['transform'](emptyStringToNull);
  }

  return fieldSchema;
};

// helper for yup transform function
function emptyStringToNull(value: any, originalValue: any) {
  console.log({ value, originalValue });
  if (typeof originalValue === 'string' && originalValue === '') {
    return null;
  }
  return value;
}
