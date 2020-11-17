import {
  Box,
  createStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { FormStoredElementType } from '../store/store';
import { AttributesEditor, ValidationsEditor } from '../components';

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
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
    },
  })
);

export const FormElementEditWindow = (props: Props) => {
  const classes = useStyles();
  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        fullWidth={true}
        maxWidth={'sm'}
      >
        <DialogTitle disableTypography className={classes.root}>
          <Typography variant="h6">{props.element.label} Editor</Typography>
          <IconButton
            aria-label="close"
            onClick={props.onClose}
            className={classes.closeButton}
            data-cy={'button-close-modal'}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box>
            <Box>
              <Box marginBottom={1}>
                <Typography variant={'h6'} color={'primary'} gutterBottom>
                  Attributes
                </Typography>
                <Divider />
              </Box>
              <AttributesEditor element={props.element} />
            </Box>
            {props.element.validators && (
              <Box>
                <Box marginBottom={2}>
                  <Typography variant={'h6'} color={'primary'} gutterBottom>
                    Validations
                  </Typography>
                  <Divider />
                </Box>
                <ValidationsEditor element={props.element} />
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
