import React from "react";
import { TextInput } from "../../form-components";
import { ValidatorCommonProps } from "../index";
import { Validator } from "../validator";

export const Min = (props: ValidatorCommonProps) => {
  return (
    <Validator
      {...props}
      controlComponent={TextInput}
      controlComponentProps={{ type: "number", label: "Minimal value/length" }}
      defaultErrorMessage={"Value is too short"}
    />
  );
};
