import React from "react";
import { ValidatorCommonProps } from "../index";
import { Validator } from "../validator";
import { TextInput } from "../../form-components/text-input";

export const Length = (props: ValidatorCommonProps) => {
  return (
    <Validator
      {...props}
      controlComponent={TextInput}
      controlComponentProps={{ type: "number", label: "Length" }}
      defaultErrorMessage={"Value must be exactly X characters long"}
    />
  );
};
