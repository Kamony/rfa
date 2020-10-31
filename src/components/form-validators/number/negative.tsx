import React from "react";
import { ValidatorCommonProps } from "../index";
import { Validator } from "../validator";
import { Switch } from "../../form-components";

export const Negative = (props: ValidatorCommonProps) => {
  return (
    <Validator
      {...props}
      controlComponent={Switch}
      controlComponentProps={{ label: "Negative" }}
      defaultErrorMessage={"Value is not negative"}
    />
  );
};
