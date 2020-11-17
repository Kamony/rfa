import { Typography, TypographyProps } from "@material-ui/core";
import React from "react";

type TreeNodeTitleProps = {
  editMode?: false;
  label: string;
} & TypographyProps;

export const TreeNodeTitle = ({ label, ...rest }: TreeNodeTitleProps) => {
  return (
    <Typography color={"primary"} variant={"h6"} {...rest}>
      {label}
    </Typography>
  );
};
