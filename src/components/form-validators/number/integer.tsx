import React from "react";
import { ValidatorCommonProps } from "../index";
import { Validator } from "../validator";
import { Switch } from "../../form-components";

export const Integer = (props: ValidatorCommonProps) => {
  return (
    <Validator
      {...props}
      controlComponent={Switch}
      controlComponentProps={{ label: "Integer" }}
      defaultErrorMessage={"Value is not an integer"}
    />
  );
};
