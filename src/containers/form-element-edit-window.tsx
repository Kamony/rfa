import {
  Box,
  createStyles,
  Dialog,
  DialogTitle,
  IconButton,
  makeStyles,
  Tab,
  Tabs,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { TabPanel } from "./tab-panel";
import CloseIcon from "@material-ui/icons/Close";
import { FormStoredElementType } from "../store/store";
import { AttributesEditor, ValidationsEditor } from "../components";

type Props = {
  open: boolean;
  onClose: () => void;
  element: FormStoredElementType;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
    },
  })
);

export const FormElementEditWindow = (props: Props) => {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle disableTypography className={classes.root}>
          <Typography variant="h6">Edit Form Element</Typography>
          <IconButton
            aria-label="close"
            onClick={props.onClose}
            className={classes.closeButton}
            data-cy={"button-close-modal"}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tabbed panel"
          indicatorColor="primary"
          textColor="primary"
          variant={"fullWidth"}
        >
          <Tab label="Attributes" />
          <Tab label="Validations" />
        </Tabs>
        <Box marginBottom={10}>
          <TabPanel value={value} index={0}>
            <AttributesEditor element={props.element} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ValidationsEditor element={props.element} />
          </TabPanel>
        </Box>
      </Dialog>
    </>
  );
};
