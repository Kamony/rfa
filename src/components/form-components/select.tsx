import React from "react";
import { Controller } from "react-hook-form";
import {
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MUISelect,
  SelectProps as MUIProps,
} from "@material-ui/core";

import {
  FormControlType,
  FormFieldError,
} from "../../types/common-form-components-types";
import { OptionType } from "../../model";
import { FormComponentWrapper } from "../../containers";

export type SelectProps = FormControlType &
  FormFieldError & {
    label: string;
    multiple?: boolean;
    helperText?: boolean;
    options: (OptionType & {
      MuiProps?: Exclude<MUIProps, OptionType>;
    })[];
  };

export const Select = (props: SelectProps) => {
  return (
    <FormComponentWrapper error={!!props.error?.message}>
      <InputLabel>{props.label}</InputLabel>
      <Controller
        as={MUISelect}
        multiple={props.multiple}
        name={props.name}
        control={props.control}
        defaultValue={props.multiple ? [] : ""}
      >
        {props.options.map((option) => (
          <MenuItem key={option.name} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </Controller>
      {(props.helperText || props.error?.message) && (
        <FormHelperText error={!!props.error?.message}>
          {props.error?.message ?? props.helperText}
        </FormHelperText>
      )}
    </FormComponentWrapper>
  );
};
