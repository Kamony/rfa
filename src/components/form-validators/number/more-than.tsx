import React from "react";
import { TextInput } from "../../form-components";
import { ValidatorCommonProps } from "../index";
import { Validator } from "../validator";

export const MoreThan = (props: ValidatorCommonProps) => {
  return (
    <Validator
      {...props}
      controlComponent={TextInput}
      controlComponentProps={{ type: "number", label: "More than" }}
      defaultErrorMessage={"Value is too low"}
    />
  );
};
