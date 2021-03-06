import React from 'react';
import {
  TreeNodeInput,
  TreeNodeInputProps,
} from '../tree/tree-node/tree-node-input';
import {
  FormContextType,
  FormControlType,
} from '../../types/common-form-components-types';
import { uuid } from '../../utils/uuid';
import { FormLabel } from '@material-ui/core';

type TreeBuilderProps = TreeNodeInputProps &
  FormContextType &
  FormControlType & {
    treeTitle: string;
    reset: never;
    setValue: never;
    unregister: never;
  };

export const TreeBuilder = ({
  name,
  register,
  control,
  label,
  error,
  setValue,
  unregister,
  reset,
  ...treeNode
}: TreeBuilderProps) => {
  return (
    <div style={{ border: '1px transparent solid' }}>
      <FormLabel>{label}</FormLabel>
      <TreeNodeInput
        {...treeNode}
        id={uuid()}
        formContext={{
          name,
          register,
          control,
        }}
      />
    </div>
  );
};
