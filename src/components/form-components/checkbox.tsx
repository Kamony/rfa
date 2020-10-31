import React from "react";
import {
  FormContextType,
  FormFieldError,
} from "../../types/common-form-components-types";
import {
  Checkbox as MUICheckbox,
  CheckboxProps as MUIProps,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@material-ui/core";
import { OptionType } from "../../model";
import { FormComponentWrapper } from "../../containers";

export type CheckBoxProps = FormContextType &
  FormFieldError & {
    label?: string;
    helperText?: string;
    options: (OptionType & {
      MuiProps?: Exclude<MUIProps, OptionType>;
    })[];
  };

export const CheckBox = (props: CheckBoxProps) => {
  return (
    <FormComponentWrapper error={!!props.error?.message}>
      {/* CHECKBOX GROUP*/}
      {props.label && <FormLabel component="legend">{props.label}</FormLabel>}
      <FormGroup>
        {props.options.map((option, i) => (
          <FormControlLabel
            key={i}
            label={option.name}
            control={
              <MUICheckbox
                {...option.MuiProps}
                inputRef={props.register}
                value={option.name}
                name={props.name}
              />
            }
          />
        ))}
      </FormGroup>
      {props.helperText && <FormHelperText>{props.helperText}</FormHelperText>}
    </FormComponentWrapper>
  );
};
