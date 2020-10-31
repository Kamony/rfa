import * as React from "react";
import {
  Box,
  Button,
  createStyles,
  Grid,
  IconButton,
  Input,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Clear, DragIndicatorOutlined } from "@material-ui/icons";
import { SortableWrapper } from "../containers";
import { useFieldArray } from "react-hook-form";
import {
  FormContextType,
  FormControlType,
} from "../types/common-form-components-types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      "&:hover $dragContainer": {
        visibility: "visible",
      },
    },
    dragContainer: {
      visibility: "hidden",
      cursor: "move",
      position: "relative",
      display: "flex",
      alignItems: "center",
      height: "100%",
      left: theme.spacing(0.5),
    },
    wrapper: {
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: theme.palette.grey.A100,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(2),
    },
    actionArea: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    actionDivider: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  })
);

export const OptionsBuilder = (props: FormControlType & FormContextType) => {
  const classes = useStyles();
  const { fields, append, remove, swap } = useFieldArray({
    name: props.name,
    control: props.control,
  });
  return (
    <>
      <Grid
        container
        spacing={1}
        direction={"column"}
        className={classes.wrapper}
      >
        <Typography color={"textSecondary"} variant={"subtitle2"}>
          options
        </Typography>

        {fields.map((item, index) => (
          <SortableWrapper
            id={item.id!}
            index={index}
            swap={swap}
            dndIndicator={"optionItemSortable"}
            key={item.id}
          >
            <Grid
              item
              container
              direction={"row"}
              alignItems={"center"}
              justify={"center"}
              spacing={2}
              className={classes.container}
            >
              <div className={classes.dragContainer}>
                <DragIndicatorOutlined color={"action"} />
              </div>
              <Grid item xs={6}>
                <Input
                  fullWidth={true}
                  placeholder={`Option ${index + 1}`}
                  autoFocus={true}
                  onFocus={(event) => {
                    event.target.select();
                  }}
                  inputRef={props.register()}
                  defaultValue={item.name}
                  name={`${props.name}[${index}].name`}
                />
              </Grid>
              {/*<Grid item xs={3}>*/}
              {/*<Input*/}
              {/*  hidden={true}*/}
              {/*  placeholder={`opt${index + 1}`}*/}
              {/*  inputRef={props.register()}*/}
              {/*  name={`${props.name}[${index}].name`}*/}
              {/*/>*/}
              {/*<input*/}
              {/*  hidden={true}*/}
              {/*  ref={props.register()}*/}
              {/*  name={`${props.name}[${index}].name`}*/}
              {/*  defaultValue={item.label}*/}
              {/*  value={item.label}*/}
              {/*/>*/}
              {/*</Grid>*/}
              <Grid item xs={2}>
                <Tooltip
                  title="Remove option"
                  aria-label="remove-option"
                  enterDelay={500}
                >
                  <IconButton aria-label="delete" onClick={() => remove(index)}>
                    <Clear />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </SortableWrapper>
        ))}

        <Box p={2} className={classes.actionArea}>
          <Button
            color={"primary"}
            variant={"outlined"}
            onClick={() => append({ name: "" })}
          >
            Add Option
          </Button>
          <div className={classes.actionDivider}>
            <Typography color={"textSecondary"}>or</Typography>
          </div>
          <Button
            variant={"text"}
            size={"small"}
            onClick={() => append({ name: "other", label: "Other" })}
          >
            Add 'Other' Option
          </Button>
        </Box>
      </Grid>
    </>
  );
};
