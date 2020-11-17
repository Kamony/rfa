import {
  Box,
  Button,
  createStyles,
  IconButton,
  Input,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { FormContextType } from "../../../types/common-form-components-types";
import { KeyValueData } from "../../../model";
import { uuid } from "../../../utils/uuid";
import { Add, Clear } from "@material-ui/icons";

type TreeNodeDataInputProps = {
  data?: KeyValueData[];
  allowUserDefinedData?: boolean;
  formContext: FormContextType;
};

export const TreeNodeDataInput = ({
  data,
  formContext,
  allowUserDefinedData,
}: TreeNodeDataInputProps) => {
  const classes = useStyles();

  const [customDataObj, setCustomDataObj] = React.useState<{
    [id: string]: string;
  }>();

  const addCustomData = React.useCallback(() => {
    setCustomDataObj((prevState) => ({
      ...prevState,
      ...{
        [uuid()]: "",
      },
    }));
  }, []);

  const removeCustomData = React.useCallback(
    (id: string) => () => {
      setCustomDataObj((prevState) => {
        if (!prevState) {
          return prevState;
        }
        let out = { ...prevState };
        delete out[id];
        return out;
      });
    },
    []
  );

  return (
    <Box paddingTop={1}>
      {data?.map((payloadEntry, index) => (
        <Box className={classes.payloadEntry} key={index}>
          <Typography
            variant={"caption"}
            className={classes.payloadCaption}
          >{`${payloadEntry.name}:`}</Typography>
          {payloadEntry.value ? (
            <Typography>{payloadEntry.value}</Typography>
          ) : (
            <Input
              inputRef={formContext.register}
              name={`${formContext.name}.data.${payloadEntry.name}`}
              defaultValue={payloadEntry.value ?? ""}
              placeholder={payloadEntry.placeholder ?? ""}
              inputProps={{ "aria-label": "description" }}
            />
          )}
        </Box>
      ))}
      {allowUserDefinedData &&
        customDataObj &&
        Object.entries(customDataObj).map(([id], index) => {
          return (
            <Box className={classes.payloadEntry} key={id}>
              <Input
                className={classes.payloadCaption}
                inputRef={formContext.register}
                name={`${formContext.name}.data.userDefined[${index}].name`}
                inputProps={{ "aria-label": "name" }}
                endAdornment={":"}
                placeholder={"name"}
                autoFocus={true}
              />
              <Input
                inputRef={formContext.register}
                name={`${formContext.name}.data.userDefined[${index}].value`}
                placeholder={"value"}
                inputProps={{ "aria-label": "description" }}
              />
              <IconButton
                aria-label="delete"
                onClick={removeCustomData(id)}
                size={"small"}
              >
                <Clear color={"error"} fontSize={"small"} />
              </IconButton>
            </Box>
          );
        })}
      {allowUserDefinedData && (
        <Box className={classes.actionArea}>
          <Button
            variant={"outlined"}
            color={"secondary"}
            onClick={addCustomData}
            startIcon={<Add />}
            size={"small"}
          >
            data entry
          </Button>
        </Box>
      )}
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    payloadCaption: {
      marginRight: theme.spacing(1),
      width: theme.spacing(13),
    },
    payloadEntry: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.grey["200"],
    },
    actionArea: {
      marginTop: theme.spacing(1),
      display: "flex",
      justifyContent: "center",
    },
  })
);
