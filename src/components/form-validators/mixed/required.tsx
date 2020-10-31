import React from "react";
import { CheckBox } from "../../form-components";
import { ValidatorCommonProps } from "../index";
import { Validator } from "../validator";

export const Required = (props: ValidatorCommonProps) => {
  return (
    <Validator
      {...props}
      controlComponent={CheckBox}
      controlComponentProps={{ options: [{ name: "Required" }] }}
      defaultErrorMessage={"Field is required"}
    />
  );
};
