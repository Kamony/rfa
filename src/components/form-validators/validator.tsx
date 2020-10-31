import { Grid } from "@material-ui/core";
import { TextInput } from "../form-components";
import React from "react";
import { ValidatorCommonProps } from "./index";

type ValidatorProps = ValidatorCommonProps & {
  controlComponent: React.FC<any>;
  controlComponentProps: any;
  defaultErrorMessage?: string;
  className?: string;
};

export const Validator = ({
  controlComponent,
  controlComponentProps,
  name,
  register,
  disabledParam,
  defaultErrorMessage,
  className,
}: ValidatorProps) => {
  return (
    <Grid container direction={"row"} className={className} spacing={1}>
      <Grid item xs={6}>
        {React.createElement(controlComponent, {
          name,
          register,
          ...controlComponentProps,
        })}
      </Grid>
      <Grid item xs={6}>
        <TextInput
          register={register}
          name={name + "ErrorMessage"}
          type={"text"}
          label={"error message"}
          muiProps={{
            disabled: disabledParam,
            defaultValue: defaultErrorMessage,
          }}
        />
      </Grid>
    </Grid>
  );
};
