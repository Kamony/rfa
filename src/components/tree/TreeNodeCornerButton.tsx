import React from "react";
import { createStyles, IconProps, Theme, makeStyles } from "@material-ui/core";
import { Remove, Add, ExpandMore, ExpandLess } from "@material-ui/icons";
import { theme } from "../../theme";
type Props = {
  onClick: () => void;
  icon: "add" | "remove" | "expandMore" | "expandLess";
  corner: "topRight" | "bottomLeft" | "bottomRight";
  color: IconProps["color"];
};

const iconMapper: Record<Props["icon"], React.FC<any>> = {
  remove: Remove,
  add: Add,
  expandMore: ExpandMore,
  expandLess: ExpandLess,
};

export const TreeNodeCornerButton = ({
  corner,
  icon,
  color = "inherit",
  onClick,
}: Props) => {
  const classes = useStyles();
  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      onClick();
    },
    [onClick]
  );
  return (
    <div className={classes[corner]}>
      <div
        className={classes.button}
        style={{
          borderColor: theme.palette.grey["300"],
        }}
        onClick={handleClick}
      >
        {React.createElement(iconMapper[icon], { color: color })}
      </div>
    </div>
  );
};
const size = 2.5;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      height: theme.spacing(size),
      width: theme.spacing(size),
      cursor: "pointer",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.default,
      borderWidth: 1,
      borderStyle: "solid",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "&:hover": {
        backgroundColor: theme.palette.grey.A100,
      },
    },
    topRight: {
      position: "absolute",
      top: -theme.spacing(size) / 2,
      right: -theme.spacing(size) / 2,
    },
    bottomLeft: {
      position: "absolute",
      bottom: -theme.spacing(size) / 2,
      left: -theme.spacing(size) / 2,
    },
    bottomRight: {
      position: "absolute",
      bottom: -theme.spacing(size) / 2,
      right: -theme.spacing(size) / 2,
    },
  })
);
