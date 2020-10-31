import React from "react";
import {
  FormContextType,
  FormFieldError,
} from "../../types/common-form-components-types";
import {
  FormControlLabel,
  FormHelperText,
  Switch as MUISwitch,
  SwitchProps as MuiSwitchProps,
} from "@material-ui/core";
import { FormComponentWrapper } from "../../containers";

export type SwitchProps = FormContextType &
  FormFieldError & {
    label: string;
    helperText?: string;
    muiProps?: MuiSwitchProps;
  };

export const Switch = (props: SwitchProps) => {
  return (
    <FormComponentWrapper error={!!props.error?.message}>
      <FormControlLabel
        control={
          <MUISwitch
            inputRef={props.register}
            name={props.name}
            {...props.muiProps}
          />
        }
        label={props.label}
      />
      {(props.helperText || props.error?.message) && (
        <FormHelperText error={!!props.error?.message}>
          {props.error?.message ?? props.helperText}
        </FormHelperText>
      )}
    </FormComponentWrapper>
  );
};
