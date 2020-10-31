import React from "react";
import {
  FormContextType,
  FormFieldError,
} from "../../types/common-form-components-types";
import {
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio as MUIRadio,
  RadioGroup,
  RadioProps as MUIProps,
} from "@material-ui/core";
import { OptionType } from "../../model";
import { FormComponentWrapper } from "../../containers";

type RadioProps = FormContextType &
  FormFieldError & {
    label: string;
    helperText?: string;
    options: (OptionType & {
      MuiProps?: Exclude<MUIProps, OptionType>;
    })[];
  };

export const Radio = (props: RadioProps) => {
  return (
    <FormComponentWrapper error={!!props.error?.message}>
      {/* RADIO GROUP*/}
      <FormLabel component="legend">{props.label}</FormLabel>
      <RadioGroup name={props.name} aria-label={props.label}>
        {props.options.map((option, i) => (
          <FormControlLabel
            key={i}
            label={option.name}
            value={option.name}
            control={
              <MUIRadio {...option.MuiProps} inputRef={props.register} />
            }
          />
        ))}
      </RadioGroup>
      {(props.helperText || props.error?.message) && (
        <FormHelperText>{props.helperText}</FormHelperText>
      )}
    </FormComponentWrapper>
  );
};
