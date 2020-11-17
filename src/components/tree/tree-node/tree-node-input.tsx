import React from 'react';
import {
  Collapse,
  Paper,
  TextFieldProps,
  Theme,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { useIntersectionObserver } from '../../../hooks/use-intersection-observer';
import { TreeNodeTitleInput } from '../tree-node-title/tree-node-title-input';
import { TreeNodeDataInput } from '../tree-node-data/tree-node-data-input';
import {
  FormContextType,
  FormControlType,
} from '../../../types/common-form-components-types';
import { uuid } from '../../../utils/uuid';
import { useWatch } from 'react-hook-form';
import { NodeTitleAnchor } from '../node-title-anchor';
import { TreeNodeCornerButton } from '../tree-node-corner-button';
import { useClientRect } from '../../../hooks/use-client-rect';

export type TreeNodeInputPayload = { name: string; value: any }[];

export type TreeNodeInputType = {
  id: string;
  descendents?: TreeNodeInputType[];
  data?: TreeNodeInputPayload;
};

export type TreeNodeInputProps = TreeNodeInputType & {
  formContext: FormContextType & FormControlType;
  isEndingNode?: boolean;
  level?: number;
  allowUserToDefineData?: boolean;
  nodeLabel?: string;
  required?: boolean;
  onDelete?: (id: string) => void;
} & TextFieldProps;

export const TreeNodeInput = ({
  id,
  formContext,
  data,
  descendents,
  allowUserToDefineData,
  isEndingNode = false,
  level = 1,
  onDelete,
  nodeLabel,
  required,
  ...textInputProps
}: TreeNodeInputProps) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(true);
  const [childNodes, setChildNodes] = React.useState<
    TreeNodeInputType['descendents']
  >();
  console.log({ id, descendents, nodeLabel });
  const hasDescendents = React.useMemo(
    () => !!(descendents?.length || childNodes?.length),
    [childNodes, descendents]
  );
  const toggleDescendents = React.useCallback(() => {
    if (!hasDescendents) {
      return;
    }
    setIsOpen((prevState) => !prevState);
  }, [hasDescendents]);

  const { ref, isSticky } = useIntersectionObserver();
  const nameValue = useWatch({
    name: `${formContext.name}.name`,
    control: formContext.control,
    defaultValue: `Node level ${level}`,
  });
  const [nodeRect, nodeRef, nodeElement] = useClientRect();
  const scrollToNode = React.useCallback(() => {
    if (!nodeElement) {
      return;
    }
    nodeElement.scrollIntoView({ behavior: 'smooth' });
  }, [nodeElement]);

  const addChildNode = React.useCallback(() => {
    if (!isOpen) {
      setIsOpen(true);
    }
    setChildNodes((prevState) => [
      ...(prevState ?? []),
      {
        id: uuid(),
      },
    ]);
  }, [isOpen]);

  const removeChildNode = React.useCallback(() => {
    onDelete?.(id);
  }, [id, onDelete]);

  const onChildRemove = React.useCallback((id: string) => {
    setChildNodes((prevState) =>
      prevState?.filter((childNode) => childNode.id !== id)
    );
  }, []);

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
                height: !isEndingNode ? '100%' : (nodeRect?.height ?? 2) / 2,
              }}
            />
            <div
              className={classes.edgeHor}
              style={{ top: (nodeRect?.height ?? 2) / 2 }}
            />
          </div>
        )}
        <NodeTitleAnchor
          visible={!!(isSticky && hasDescendents && isOpen)}
          title={nameValue}
          onClick={scrollToNode}
        />
        <Paper variant={'outlined'} className={classes.node} innerRef={nodeRef}>
          <TreeNodeTitleInput
            {...textInputProps}
            label={nodeLabel}
            inputRef={formContext.register}
            name={`${formContext.name}.name`}
            style={{ display: 'flex', flex: 1 }}
          />

          <TreeNodeCornerButton
            onClick={addChildNode}
            icon={'add'}
            corner={'bottomRight'}
            color={'action'}
          />
          {onDelete && (
            <TreeNodeCornerButton
              onClick={removeChildNode}
              icon={'remove'}
              corner={'topRight'}
              color={'error'}
            />
          )}
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
          <TreeNodeDataInput
            data={data}
            allowUserDefinedData={allowUserToDefineData}
            formContext={formContext}
          />
        </Paper>

        {/* Node Descendents */}
        <Collapse in={isOpen}>
          {childNodes?.map((descendant, index) => (
            <TreeNodeInput
              key={descendant.id}
              id={descendant.id}
              formContext={{
                register: formContext.register,
                name: `${formContext.name}.descendents[${index}]`,
                control: formContext.control,
              }}
              data={data}
              descendents={descendant.descendents}
              level={level + 1}
              isEndingNode={childNodes?.length === index + 1}
              onDelete={onChildRemove}
              allowUserToDefineData={allowUserToDefineData}
              nodeLabel={nodeLabel}
              {...textInputProps}
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
    removeButton: {
      position: 'absolute',
      height: 36,
      width: 36,
      top: -18,
      right: -18,
    },
    addButton: {
      position: 'absolute',
      height: 36,
      width: 36,
      bottom: -18,
      right: -18,
    },
  })
);
