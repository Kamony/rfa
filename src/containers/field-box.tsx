import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Divider, List, Paper, Typography } from "@material-ui/core";
import { FormElement, formElements } from "../model";
import { DraggableField } from "../components/draggable-field";
import { useFormElements } from "../hooks/useFormElements";

type Props = {
  children?: React.ReactNode;
};

const useStyles = makeStyles({
  container: {
    minHeight: 500,
  },
});

export const FieldBox: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { createFormElement } = useFormElements();

  const handleClick = React.useCallback(
    (formElement: FormElement) => createFormElement(formElement),
    [createFormElement]
  );

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Typography variant={"h5"} color={"primary"} gutterBottom>
        Form toolbox
      </Typography>
      <Paper className={classes.container} variant={"outlined"}>
        <List>
          {formElements.map((formElement, i) => (
            <DraggableField
              key={i}
              formElement={formElement}
              onClick={() => handleClick(formElement)}
            />
          ))}
          <Divider />
          {props.children}
        </List>
      </Paper>
    </Box>
  );
};
