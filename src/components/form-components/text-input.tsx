import React from "react";
import { TextField, TextFieldProps } from "@material-ui/core";
import { FormComponentWrapper } from "../../containers";
import {
  FormContextType,
  FormFieldError,
} from "../../types/common-form-components-types";

export type TextInputProps = FormContextType &
  FormFieldError & {
    label: string;
    helperText?: string;
    placeholder?: string;
    type?: string;
    muiProps?: TextFieldProps;
  };
export const TextInput = (props: TextInputProps) => {
  return (
    <FormComponentWrapper variant={"outlined"}>
      <TextField
        inputRef={props.register}
        name={props.name}
        label={props.label}
        placeholder={props.placeholder}
        type={props.type}
        helperText={props.error?.message ?? props.helperText}
        error={!!props.error?.message}
        InputLabelProps={{
          shrink: true,
        }}
        {...props.muiProps}
      />
    </FormComponentWrapper>
  );
};
