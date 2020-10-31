import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

type Props = {
  opened: boolean;
  title?: string;
  text: string;
  onSuccess: () => void;
  onDeny: () => void;
};
export const ConfirmationDialog = (props: Props) => {
  return (
    <Dialog
      open={props.opened}
      onClose={props.onDeny}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {props.title && (
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      )}
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onDeny} color="primary">
          Disagree
        </Button>
        <Button onClick={props.onSuccess} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
