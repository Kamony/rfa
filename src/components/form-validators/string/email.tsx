import React from "react";
import { ValidatorCommonProps } from "../index";
import { Validator } from "../validator";
import { Switch } from "../../form-components/switch";

export const Email = (props: ValidatorCommonProps) => {
  return (
    <Validator
      {...props}
      controlComponent={Switch}
      controlComponentProps={{ label: "Email" }}
      defaultErrorMessage={"Value is not a valid email address"}
    />
  );
};
