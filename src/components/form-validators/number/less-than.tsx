import React from "react";
import { TextInput } from "../../form-components";
import { ValidatorCommonProps } from "../index";
import { Validator } from "../validator";

export const LessThan = (props: ValidatorCommonProps) => {
  return (
    <Validator
      {...props}
      controlComponent={TextInput}
      controlComponentProps={{ type: "number", label: "Less than" }}
      defaultErrorMessage={"Value is too high"}
    />
  );
};
