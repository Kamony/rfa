import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  createStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Theme,
  Typography,
} from "@material-ui/core";
import { useDataExporter } from "../hooks/useDataExporter";
import { makeStyles } from "@material-ui/styles";
import { Close as CloseIcon } from "@material-ui/icons";
type Props = {
  open: boolean;
  onClose: () => void;
};

const UploadJSONButton = ({
  onJson,
  imported,
}: {
  onJson?: (json: Object) => void;
  imported?: boolean;
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const uploadInputRef = React.useRef<HTMLInputElement>(null);
  const handleCapture = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target || !target.files) {
      return;
    }
    setIsLoading(true);
    const fileReader = new FileReader();
    fileReader.readAsText(target.files[0]);
    fileReader.onload = (e) => {
      const jsonString = e.target?.result?.toString();
      const json = JSON.parse(jsonString ?? "");
      setIsLoading(false);
      onJson?.(json);
    };
  };
  return (
    <React.Fragment>
      <input
        ref={uploadInputRef}
        type="file"
        accept="application/JSON"
        style={{ display: "none" }}
        onChange={handleCapture}
      />
      <Button
        onClick={() => uploadInputRef?.current?.click()}
        variant="text"
        color={imported ? "default" : "secondary"}
      >
        {isLoading && <CircularProgress />}
        {imported ? "Imported" : "Import"}
      </Button>
    </React.Fragment>
  );
};

export const ExportWindow = ({ open, onClose }: Props) => {
  const { handlers, state } = useDataExporter();
  const classes = useStyles();
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className={classes.root} disableTypography>
        <Typography variant="h6">{"Export form"}</Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography color={"textSecondary"}>
          Export data as JSON file and/or import it to react form architect -
          renderer
        </Typography>
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-around"}
          className={classes.root}
        >
          <Button
            onClick={handlers.saveAsJSON}
            variant="text"
            color={state.exported ? "default" : "secondary"}
          >
            {state.exported ? "Export as JSON" : "Exported"}
          </Button>
          <Typography className={classes.divider}>{` or `}</Typography>
          <UploadJSONButton
            onJson={handlers.importData}
            imported={state.imported}
          />
          <Typography className={classes.divider}>{` or `}</Typography>
          <Button
            onClick={handlers.copyToClipboard}
            variant="text"
            color={state.copied ? "default" : "secondary"}
          >
            {state.copied ? "Copied" : "Copy to Clipboard"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
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
      color: theme.palette.grey[500],
    },
    divider: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  })
);
