import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { IconButton, IconButtonProps } from "@material-ui/core";
import React from "react";

type Props = IconButtonProps & {
  isOpen: boolean;
  onClick: () => void;
};

export const ToggleButton = ({ isOpen, onClick, ...rest }: Props) => {
  return (
    <IconButton onClick={onClick} {...rest}>
      {isOpen ? (
        <ExpandLess fontSize={"small"} />
      ) : (
        <ExpandMore fontSize={"small"} />
      )}
    </IconButton>
  );
};
