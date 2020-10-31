import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.grey.A100,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.grey.A200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dropArea: {
    width: "100%",
    justifyContent: "center",
  },
}));

export const DropIndicator = () => {
  const classes = useStyles();
  return <div className={classes.root}>Drop here!</div>;
};
