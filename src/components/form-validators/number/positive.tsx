import React from "react";
import { ValidatorCommonProps } from "../index";
import { Validator } from "../validator";
import { Switch } from "../../form-components";

export const Positive = (props: ValidatorCommonProps) => {
  return (
    <Validator
      {...props}
      controlComponent={Switch}
      controlComponentProps={{ label: "Positive" }}
      defaultErrorMessage={"Value is not positive"}
    />
  );
};
