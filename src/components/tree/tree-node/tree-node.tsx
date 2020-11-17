import React from 'react';
import {
  Box,
  Collapse,
  createStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { theme } from '../../../theme';
import { useIntersectionObserver } from '../../../hooks/use-intersection-observer';
import { useClientRect } from '../../../hooks/use-client-rect';
import { NodeTitleAnchor } from '../node-title-anchor';
import { TreeNodeTitle } from '../tree-node-title/tree-node-title';
import { TreeNodeCornerButton } from '../tree-node-corner-button';

export type TreeNodePayload = { [key: string]: string };

export type TreeNodeType = {
  name: string;
  descendents?: TreeNodeType[];
  data?: TreeNodePayload;
  userData?: { name: string; value: string }[];
};

type Props = {
  node: TreeNodeType;
  isEndingNode?: boolean;
  level?: number;

  children?: never;
};

export const TreeNode = ({ node, isEndingNode = false, level = 1 }: Props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(true);

  const { ref, isSticky } = useIntersectionObserver();
  const [nodeRect, nodeRef, nodeElement] = useClientRect();

  const hasDescendents = React.useMemo(() => !!node.descendents?.length, [
    node.descendents,
  ]);
  const toggleDescendents = React.useCallback(() => {
    if (!hasDescendents) {
      return;
    }
    setIsOpen((prevState) => !prevState);
  }, [hasDescendents]);
  const scrollToNode = React.useCallback(() => {
    if (!nodeElement) {
      return;
    }
    nodeElement.scrollIntoView({ behavior: 'smooth' });
  }, [nodeElement]);

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
                  ? '100%'
                  : (nodeRect?.height ?? 2) / 2 + theme.spacing(2),
              }}
            />
            <div
              className={classes.edgeHor}
              style={{ top: (nodeRect?.height ?? 2) / 2 + theme.spacing(2) }}
            />
          </div>
        )}
        <NodeTitleAnchor
          visible={!!(isSticky && hasDescendents && isOpen)}
          title={node.name}
          onClick={scrollToNode}
        />
        <Paper variant={'outlined'} className={classes.node} innerRef={nodeRef}>
          <TreeNodeTitle label={node.name} gutterBottom={!!node.data} />

          {hasDescendents && (
            <TreeNodeCornerButton
              onClick={toggleDescendents}
              icon={isOpen ? 'expandLess' : 'expandMore'}
              corner={'bottomLeft'}
              color={'action'}
            />
          )}
          <div ref={ref} />
          {/* Node Content */}
          {node.data &&
            Object.entries(node.data).map(([name, value], index) => (
              <Box className={classes.payloadEntry} key={index}>
                <Typography
                  variant={'caption'}
                  className={classes.payloadCaption}
                >{`${name}:`}</Typography>
                <Typography variant={'body2'}>{value}</Typography>
              </Box>
            ))}
          {node.userData?.map((dataEntry, index) => (
            <Box className={classes.payloadEntry} key={index}>
              <Typography
                variant={'caption'}
                className={classes.payloadCaption}
              >{`${dataEntry.name}:`}</Typography>
              <Typography variant={'body2'}>{dataEntry.value}</Typography>
            </Box>
          ))}
        </Paper>
        {/* Node Descendents */}
        <Collapse in={isOpen}>
          {node.descendents?.map((descendant, index) => (
            <TreeNode
              key={index}
              node={descendant}
              level={++level}
              isEndingNode={node.descendents?.length === index + 1}
            />
          ))}
        </Collapse>
      </div>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    edgeWrapper: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: theme.spacing(5),
      zIndex: 0,
    },
    edgeVer: {
      width: 1,
      backgroundColor: theme.palette.grey['300'],
    },
    edgeHor: {
      position: 'absolute',
      height: 1,
      width: '100%',
      backgroundColor: theme.palette.grey['300'],
    },
    root: {
      position: 'relative',
      padding: theme.spacing(2, 0, 2, 5),
    },
    node: {
      position: 'relative',
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      width: 'fit-content',
    },
    payloadCaption: {
      marginRight: theme.spacing(1),
      width: theme.spacing(13),
    },
    payloadEntry: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: theme.palette.grey['200'],
    },
  })
);
