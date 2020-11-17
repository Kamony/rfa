import { ToggleButton } from "./ToggleButton";
import React from "react";
import { makeStyles } from "@material-ui/styles";
import { createStyles } from "@material-ui/core";

type Props = {
  isOpen: boolean;
  onClick: () => void;
};

export const TreeExpandButton = (props: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ToggleButton {...props} className={classes.button} color={"secondary"} />
    </div>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: "absolute",
      bottom: 0,
      left: 0,
    },
    button: {
      height: 42,
      width: 42,
      position: "relative",
      left: -21,
      top: 21,
    },
  })
);
