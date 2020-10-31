import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Theme, Typography } from "@material-ui/core";
import { useStore } from "../store/store";

type Props = {};

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      position: "absolute",
      height: 600,
      width: 600,
      overflow: "scroll",
      backgroundColor: theme.palette.grey["200"],
      borderWidth: 1,
      borderColor: theme.palette.grey["400"],
      borderStyle: "solid",
      transition: "all 0.3s ease",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      height: "100%",
      width: "100%",
    },
    label: {
      width: 30,
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.primary.dark,
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "&>div": {
        transform: "rotate(90deg)",
      },
    },
    content: {
      paddingLeft: 35,
    },
  };
});

export const DebugPanel: React.FC<Props> = (_) => {
  const [opened, setOpen] = React.useState(false);
  const classes = useStyles();
  const [store] = useStore((s) => s);
  return (
    <div
      className={classes.root}
      onClick={() => setOpen(!opened)}
      style={{ right: opened ? 0 : -570, top: 50 }}
    >
      <div className={classes.row}>
        <div className={classes.label}>
          <div>Debug</div>
        </div>
        <div className={classes.content}>
          <Box display={"flex"} flexDirection={"column"} p={1}>
            <Typography variant={"h5"} color={"secondary"} gutterBottom>
              Data view
            </Typography>
            <pre>{JSON.stringify(store.elements, null, 2)}</pre>
            <pre>{JSON.stringify(store.grouping, null, 2)}</pre>
          </Box>
        </div>
      </div>
    </div>
  );
};
