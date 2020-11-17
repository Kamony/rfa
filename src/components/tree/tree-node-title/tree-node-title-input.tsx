import { TextField, TextFieldProps } from "@material-ui/core";
import React from "react";

type TreeNodeTitleProps = {
  // label: string;
} & TextFieldProps;

export const TreeNodeTitleInput = ({ ...rest }: TreeNodeTitleProps) => {
  return (
    <TextField
      {...rest}
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};
