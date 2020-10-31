import React from "react";
import { TextInput } from "../../form-components";
import { ValidatorCommonProps } from "../index";
import { Validator } from "../validator";

export const Max = (props: ValidatorCommonProps) => {
  return (
    <Validator
      {...props}
      controlComponent={TextInput}
      controlComponentProps={{ type: "number", label: "Maximal value/length" }}
      defaultErrorMessage={"Value is too long"}
    />
  );
};
