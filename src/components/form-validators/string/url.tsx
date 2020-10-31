import React from "react";
import { ValidatorCommonProps } from "../index";
import { Validator } from "../validator";
import { Switch } from "../../form-components/switch";

export const Url = (props: ValidatorCommonProps) => {
  return (
    <Validator
      {...props}
      controlComponent={Switch}
      controlComponentProps={{ label: "URL" }}
      defaultErrorMessage={"Value is not a valid url"}
    />
  );
};
