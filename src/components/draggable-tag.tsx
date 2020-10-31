import * as React from "react";
import { Box, Tab, Typography } from "@material-ui/core";
import { SortableWrapper } from "../containers";
import { theme } from "../theme";

type Props = {
  value: string;
  label: string;
  number: number;
  id: string;
  index: number;
  swap: (a: number, b: number) => void;
};
export const DraggableTag = React.forwardRef(
  ({ swap, index, value, label, number, id, ...tabProps }: Props, ref: any) => {
    return (
      <SortableWrapper id={id} index={index} swap={swap}>
        <Tab
          {...tabProps}
          ref={ref}
          value={value}
          label={
            <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
              <Typography>{label}</Typography>
              <Typography
                variant={"caption"}
                color={"textSecondary"}
                style={{ marginLeft: theme.spacing(1) }}
              >
                {number}
              </Typography>
            </Box>
          }
          wrapped={true}
        />
      </SortableWrapper>
    );
  }
);
