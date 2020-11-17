import React from "react";
import {
  Box,
  Collapse,
  createStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { NodeTitleAnchor } from "../NodeTitleAnchor";
import { useIntersectionObserver } from "../useIntersectionObserver";
import { TreeExpandButton } from "../TreeExpandButton";
import { TreeNodeTitle } from "../TreeNodeTitle/TreeNodeTitle";
import { TreeNodeTitleInput } from "../TreeNodeTitle/TreeNodeTitleInput";

export type TreeNodePayload = { name: string; value: any }[];

export type TreeNodeType = {
  id: string;
  label: string;
  descendents?: TreeNodeType[];
  data?: TreeNodePayload;
};

type Props = {
  node: TreeNodeType;
  isEndingNode?: boolean;
  level?: number;
  isEditMode?: boolean;
  children?: never;
};

export const TreeNode = ({
  node,
  isEditMode,
  isEndingNode = false,
  level = 1,
}: Props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  const hasDescendents = React.useMemo(() => node.descendents?.length, [
    node.descendents,
  ]);
  const toggleDescendents = React.useCallback(() => {
    if (!hasDescendents) {
      return;
    }
    setIsOpen((prevState) => !prevState);
  }, [hasDescendents]);

  const { ref, isSticky } = useIntersectionObserver();

  const scrollToNode = React.useCallback(() => {
    if (!nodeRef.current) {
      return;
    }

    nodeRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const nodeRef = React.useRef<HTMLDivElement>();

  return (
    <>
      <div
        className={classes.root}
        style={level === 1 ? { paddingLeft: 0 } : {}}
      >
        {level !== 1 && (
          <div className={classes.edgeWrapper}>
            <div
              className={classes.edgeVer}
              style={{
                height: !isEndingNode
                  ? "100%"
                  : (nodeRef.current?.offsetHeight ?? 2) / 2,
              }}
            />
            <div
              className={classes.edgeHor}
              style={{ top: (nodeRef.current?.offsetHeight ?? 2) / 2 }}
            />
          </div>
        )}
        <NodeTitleAnchor
          visible={!!(isSticky && hasDescendents && isOpen)}
          title={node.label}
          onClick={scrollToNode}
        />
        <Paper variant={"outlined"} className={classes.node} innerRef={nodeRef}>
          {/* Node Title */}
          {/*<Typography*/}
          {/*  color={"primary"}*/}
          {/*  variant={"h6"}*/}
          {/*  gutterBottom={!!node.data}*/}
          {/*>*/}
          {/*  {node.label}*/}
          {/*</Typography>*/}
          {isEditMode ? (
            <TreeNodeTitleInput />
          ) : (
            <TreeNodeTitle
              editMode={!!isEditMode}
              label={node.label}
              gutterBottom={!!node.data}
            />
          )}

          <div ref={ref} />
          {/* Node Content */}
          {node.data?.map((payloadEntry, index) => (
            <Box className={classes.payloadEntry} key={index}>
              <Typography
                variant={"caption"}
                className={classes.payloadCaption}
              >{`${payloadEntry.name}:`}</Typography>
              <Typography variant={"body2"}>{payloadEntry.value}</Typography>
            </Box>
          ))}
          {hasDescendents && (
            <TreeExpandButton isOpen={isOpen} onClick={toggleDescendents} />
          )}
        </Paper>
        {/* Node Descendents */}
        {hasDescendents && (
          <Collapse in={isOpen}>
            {node.descendents!.map((descendant, index) => (
              <TreeNode
                node={descendant}
                level={++level}
                key={descendant.id}
                isEndingNode={node.descendents?.length === index + 1}
              />
            ))}
          </Collapse>
        )}
      </div>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    edgeWrapper: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: theme.spacing(2),
      width: theme.spacing(5),
      zIndex: 0,
    },
    edgeVer: {
      width: 1,
      backgroundColor: theme.palette.grey["300"],
    },
    edgeHor: {
      position: "absolute",
      height: 1,
      width: "100%",
      backgroundColor: theme.palette.grey["300"],
    },
    root: {
      position: "relative",
      padding: theme.spacing(1, 0, 1, 5),
    },
    node: {
      position: "relative",
      padding: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      width: "fit-content",
    },
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
  })
);
