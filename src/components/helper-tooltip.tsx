import React from "react";
import { Tooltip } from "@material-ui/core";
import { HelpOutline } from "@material-ui/icons";
type Props = {
  text: string;
  children?: never;
};

export const HelperTooltip = ({ text }: Props) => {
  return (
    <Tooltip title={text}>
      <HelpOutline fontSize={"small"} color={"action"} />
    </Tooltip>
  );
};
