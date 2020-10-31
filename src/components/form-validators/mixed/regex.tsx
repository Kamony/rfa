import React from "react";
import { ValidatorCommonProps } from "../index";
import { Validator } from "../validator";
import { TextInput } from "../../form-components";
import { InputAdornment } from "@material-ui/core";

export const Regex = (props: ValidatorCommonProps) => {
  return (
    <Validator
      {...props}
      controlComponent={TextInput}
      controlComponentProps={{
        label: "Regular expression",
        muiProps: {
          InputProps: {
            startAdornment: <InputAdornment position="start">/</InputAdornment>,
            endAdornment: <InputAdornment position="end">/</InputAdornment>,
          },
        },
      }}
      defaultErrorMessage={"Value does not match expression"}
    />
  );
};
