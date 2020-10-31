import {
  createStyles,
  Fab,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useFieldCreator, useFormElements, useNameGenerator } from "../hooks";
import { FormStoredElementType } from "../store/store";
import { Control, useForm } from "react-hook-form";
import SaveIcon from "@material-ui/icons/Save";
import { componentMapper } from "../model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    previewContainer: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2) * 2,
      display: "flex",
      height: "100%",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    floatingButton: {
      position: "absolute",
      right: theme.spacing(2),
      bottom: theme.spacing(2),
      float: "right",
    },
    icon: {
      marginRight: theme.spacing(1),
    },
  })
);

type AttributesEditFieldProps = {
  element: FormStoredElementType;
};
export const AttributesEditor = (props: AttributesEditFieldProps) => {
  const {
    register,
    unregister,
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
  } = useForm({
    defaultValues: props.element.attributes,
  });
  const watcher = watch();
  const { createName } = useNameGenerator();
  const { getAttributeEditField } = useFieldCreator();
  const {
    setFormElementAttributes,
    setFormElementAttribute,
  } = useFormElements();
  const classes = useStyles();

  const handleSave = (data: any) => {
    delete data[props.element.name];
    data.label !== props.element.attributes.label &&
      setFormElementAttribute(props.element.id, "name", createName(data.label));
    setFormElementAttributes(props.element.id, data);
  };
  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <Paper
        className={classes.previewContainer}
        color={"grey"}
        variant={"outlined"}
      >
        <Typography color={"textPrimary"}>Preview</Typography>
        {React.createElement(componentMapper[props.element.render], {
          ...props.element.attributes,
          ...{ register, unregister, control, setValue, reset },
          ...watcher,
          name: props.element.name,
        })}
      </Paper>
      <Grid item container direction={"column"} spacing={2}>
        {props.element.attributeSchema.map((attr) => (
          <Grid item key={attr.name}>
            {getAttributeEditField(attr, { register }, control as Control)}
          </Grid>
        ))}
      </Grid>
      <Fab
        variant="extended"
        color={"secondary"}
        type={"submit"}
        className={classes.floatingButton}
      >
        <SaveIcon className={classes.icon} />
        apply
      </Fab>
    </form>
  );
};
