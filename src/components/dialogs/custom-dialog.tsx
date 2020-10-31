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
  text?: string;
  onSuccess: () => void;
  onDeny: () => void;
  confirmationText?: string;
  cancelationText?: string;
  children: React.ReactNode;
};
export const CustomDialog = (props: Props) => {
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
        {props.text && (
          <DialogContentText id="alert-dialog-description">
            {props.text}
          </DialogContentText>
        )}
        {props.children}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onDeny} color="primary">
          {props.cancelationText ?? "Cancel"}
        </Button>
        <Button onClick={props.onSuccess} color="primary" autoFocus>
          {props.confirmationText ?? "OK"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
