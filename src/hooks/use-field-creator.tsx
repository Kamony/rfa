import React from 'react';
import { AttributeSchema } from '../model';
import { Select, Switch, TextInput } from '../components/form-components';
import { Control, useForm } from 'react-hook-form';
import { OptionsBuilder } from '../components';
import { TreeNodeDataBuilder } from '../components/tree/tree-node-data-builder';

export const useFieldCreator = () => {
  const getAttributeEditField = (
    attribute: AttributeSchema,
    formContextRegister: Pick<ReturnType<typeof useForm>, 'register'>,
    formContextControl: Control
  ) => {
    const attributesFieldMap: Record<
      AttributeSchema['type'],
      React.ReactElement
    > = {
      input: (
        <TextInput {...attribute} register={formContextRegister.register} />
      ),
      select: (
        <Select
          {...attribute}
          options={attribute.options!}
          control={formContextControl}
        />
      ),
      checkbox: <div>Checkbox is not mapped yet</div>,
      options: (
        <OptionsBuilder
          name={attribute.name}
          control={formContextControl}
          register={formContextRegister.register}
        />
      ),
      radio: <div>radio is not mapped yet</div>,
      switch: <Switch {...attribute} register={formContextRegister.register} />,
      keyValueData: (
        <TreeNodeDataBuilder
          control={formContextControl}
          name={attribute.name}
          register={formContextRegister.register}
        />
      ),
    };

    return attributesFieldMap[attribute.type];
  };

  return {
    getAttributeEditField,
  };
};
