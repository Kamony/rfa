import React from "react";

import { DragHandleOutlined, EditOutlined } from "@material-ui/icons";

import {
  createStyles,
  Grid,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { FormStoredElementType } from "../store/store";
import { FormElementEditWindow, SortableWrapper } from "../containers";
import { makeStyles } from "@material-ui/styles";
import { useForm } from "react-hook-form";
import { FormElementToolbox } from "./form-element-toolbox";
import { useDialog, useFormElementActions } from "../hooks";
import { componentMapper } from "../model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    spacing: {
      padding: theme.spacing(1),
    },
    dragArea: {
      cursor: "move",
      padding: theme.spacing(0.2, 1, 0.2, 1),
    },
    center: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      width: "100%",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: theme.palette.grey.A100,
    },
    elementContainer: {
      padding: theme.spacing(0, 2, 1, 2),
    },
  })
);

type Props = {
  element: FormStoredElementType;
  index: number;
  formContextRegistration: Partial<ReturnType<typeof useForm>>;
};

export const FormBuildElement: React.FC<Props> = (props: Props) => {
  const { swapElement } = useFormElementActions(props.element.id);
  const [open, handleOpen, handleClose] = useDialog(false);
  const classes = useStyles();
  return (
    <div style={{ width: "100%", marginBottom: 10 }}>
      <SortableWrapper
        id={props.element.id}
        index={props.index}
        swap={swapElement(props.element.groupID)}
      >
        <Paper
          className={classes.container}
          style={{ width: "100%" }}
          elevation={0}
        >
          <Grid container direction={"column"}>
            <Grid item container direction={"row"} justify={"space-between"}>
              <Grid item>
                <div className={classes.dragArea}>
                  <DragHandleOutlined
                    color={"action"}
                    className={classes.center}
                  />
                </div>
              </Grid>
              <Grid item className={classes.spacing}>
                <Typography color={"secondary"} variant={"overline"}>
                  {props.element.label}
                </Typography>
              </Grid>
              <Grid item>
                <FormElementToolbox
                  formElementId={props.element.id}
                  actions={
                    !props.element.isReadOnly
                      ? [
                          {
                            icon: <EditOutlined color={"action"} />,
                            label: "Edit",
                            onClick: handleOpen,
                          },
                        ]
                      : undefined
                  }
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction={"row"}
              alignItems={"center"}
              spacing={1}
            >
              <Grid item xs={12}>
                <div className={classes.elementContainer}>
                  {React.createElement(componentMapper[props.element.render], {
                    ...props.element.attributes,
                    ...props.formContextRegistration,
                    name: props.element.name,
                  })}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </SortableWrapper>
      <FormElementEditWindow
        open={open}
        onClose={handleClose}
        element={props.element}
        // validations={getValidationSchemaForType(element.type)}
      />
    </div>
  );
};
