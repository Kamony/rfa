import {createStyles, Fab, Grid, makeStyles, Theme,} from "@material-ui/core";
import React from "react";
import {FormStoredElementType} from "../store/store";
import {useForm} from "react-hook-form";
import SaveIcon from "@material-ui/icons/Save";
import {useFormElements, useValidationCreator} from "../hooks";
import {validatorsMapper} from "../model";

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
    validator: {
      marginBottom: theme.spacing(2),
    },
  })
);

type AttributesEditFieldProps = {
  element: FormStoredElementType;
};
export const ValidationsEditor = (props: AttributesEditFieldProps) => {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: props.element.validations,
  });
  useValidationCreator();
  const watcher = watch();
  const { handlers } = useFormElements();
  const classes = useStyles();

  const handleSave = (data: any) => {
    console.log({ data });
    handlers.setFormElementValidations(props.element.id, data);
  };
  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <Grid container direction={"column"} spacing={2}>
        {props.element.validators?.map((validator) =>
          React.createElement(validatorsMapper[validator], {
            key: validator,
            register,
            disabledParam: !watcher[validator],
            name: validator,
            className: classes.validator,
          })
        )}
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
