import * as React from "react";
import {
  Box,
  Button,
  createStyles,
  Divider,
  Grid,
  IconButton,
  Input,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Clear, DragIndicatorOutlined } from "@material-ui/icons";
import { SortableWrapper } from "../../containers";
import { useFieldArray } from "react-hook-form";
import {
  FormContextType,
  FormControlType,
} from "../../types/common-form-components-types";
import { HelperTooltip } from "./HelperTooltip";

export const TreeNodeDataBuilder = (
  props: FormControlType & FormContextType
) => {
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
          Node data
        </Typography>

        <Grid
          item
          container
          direction={"row"}
          alignItems={"center"}
          justify={"center"}
          spacing={2}
          className={classes.container}
        >
          {/*<div className={classes.dragContainer} />*/}
          <div style={{ width: 26 }} />
          <Grid item xs={4}>
            <Typography variant={"caption"} color={"primary"}>
              title
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant={"caption"} color={"primary"}>
              input placeholder
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant={"caption"} color={"primary"}>
              input value
            </Typography>
            <HelperTooltip
              text={
                "When filled, user cannot edit this field, use for constants"
              }
            />
          </Grid>
          <Grid item xs={1} />
        </Grid>
        <Divider />
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
              <Grid item xs={4}>
                <Input
                  fullWidth={true}
                  placeholder={`Name ${index + 1}`}
                  autoFocus={true}
                  onFocus={(event) => {
                    event.target.select();
                  }}
                  inputRef={props.register()}
                  defaultValue={item.name}
                  name={`${props.name}[${index}].name`}
                  endAdornment={":"}
                />
              </Grid>
              <Grid item xs={3}>
                <Input
                  fullWidth={true}
                  placeholder={`Placeholder ${index + 1}`}
                  autoFocus={true}
                  onFocus={(event) => {
                    event.target.select();
                  }}
                  inputRef={props.register()}
                  defaultValue={item.placeholder}
                  name={`${props.name}[${index}].placeholder`}
                />
              </Grid>
              <Grid item xs={3}>
                <Input
                  fullWidth={true}
                  placeholder={`Value ${index + 1}`}
                  autoFocus={true}
                  onFocus={(event) => {
                    event.target.select();
                  }}
                  inputRef={props.register()}
                  defaultValue={item.value}
                  name={`${props.name}[${index}].value`}
                />
              </Grid>

              <Grid item xs={1}>
                <Tooltip
                  title="Remove option"
                  aria-label="remove-option"
                  enterDelay={500}
                >
                  <IconButton
                    aria-label="delete"
                    onClick={() => remove(index)}
                    size={"small"}
                  >
                    <Clear color={"error"} fontSize={"small"} />
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
            Add
          </Button>
        </Box>
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      flexWrap: "nowrap",
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
