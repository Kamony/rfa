import React from "react";
import { FormControl, FormControlProps } from "@material-ui/core";

export const FormComponentWrapper = ({
  children,
  ...rest
}: FormControlProps & {
  children: React.ReactNode;
}) => {
  return (
    <FormControl style={{ width: "100%" }} {...rest}>
      {children}
    </FormControl>
  );
};
