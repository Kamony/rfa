import React from "react";
import { createStyles, makeStyles, Theme, Tooltip } from "@material-ui/core";
import {
  DeleteOutlined,
  FileCopyOutlined,
  SwapHorizontalCircleOutlined,
} from "@material-ui/icons";
import { useDialog, useFormElementActions } from "../hooks";
import { GroupChooserDialog } from "./group-chooser-dialog";

export type ActionType = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

type ToolBoxProps = {
  formElementId: string;
  actions?: ActionType[];
};

const useToolboxStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "row",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: theme.palette.grey.A100,
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderTopWidth: 0,
    },
    actionItem: {
      padding: theme.spacing(0.2, 1, 0.2, 1),
      borderRightWidth: 1,
      borderRightStyle: "solid",
      borderRightColor: theme.palette.grey.A100,
      cursor: "pointer",
      "&:last-child": {
        borderRightWidth: 0,
      },
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
);

export const FormElementToolbox: React.FC<ToolBoxProps> = (props) => {
  const classes = useToolboxStyles();
  const [open, handleOpen, handleClose] = useDialog();
  const { removeElement, copyElement, transferElement } = useFormElementActions(
    props.formElementId
  );

  const commonActions = [
    {
      icon: <SwapHorizontalCircleOutlined color={"action"} />,
      label: "Change Group",
      onClick: handleOpen,
    },
    {
      icon: <FileCopyOutlined color={"action"} />,
      label: "Copy",
      onClick: copyElement,
    },
    {
      icon: <DeleteOutlined color={"error"} />,
      label: "Delete",
      onClick: removeElement,
    },
  ];

  const actions = props.actions
    ? [...props.actions, ...commonActions]
    : [...commonActions];

  return (
    <div className={classes.container}>
      {actions.map((action, i) => (
        <Tooltip title={action.label} key={i}>
          <div
            className={classes.actionItem}
            onClick={action.onClick}
            data-cy={`action-${action.label}`}
          >
            {action.icon}
          </div>
        </Tooltip>
      ))}
      <GroupChooserDialog
        open={open}
        onSuccess={transferElement}
        onClose={handleClose}
      />
    </div>
  );
};
