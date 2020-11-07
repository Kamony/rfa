import * as React from 'react';
import { useDrop } from 'react-dnd';
import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  makeStyles,
  Paper,
  Tabs,
  TextField,
} from '@material-ui/core';
import { FormElementsContainer } from './form-elements-container';
import { useDialog, useFormElements, useGrouping } from '../hooks';
import { FormElement } from '../model';
import { ConfirmationDialog, CustomDialog } from '../components/dialogs';
import { DraggableTag } from '../components';
import { RfaSchemaTransferer } from './rfa-schema-transferer';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
  className: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flex: '1 1 0',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  contentWrapper: {
    padding: 10,
  },
  dropArea: {
    width: '100%',
    justifyContent: 'center',
  },
  buttonGroup: {
    justifyContent: 'flex-end',
    paddingBottom: 5,
  },
  dataTransferButtonGroup: {
    justifyContent: 'flex-start',
    paddingBottom: 5,
  },
});

export const DropArea = () => {
  const [customizedGroupName, setCustomizedGroupName] = React.useState('');

  const classes = useStyles();
  const {
    groupings,
    addGroup,
    setActiveGroup,
    renameGroup,
    deleteGroup,
    ActiveGroupName,
    swapGroups,
  } = useGrouping();
  const { createFormElement, allElements } = useFormElements();
  const [openDelete, handleOpenDelete, handleCloseDelete] = useDialog();
  const [openRename, handleOpenRename, handleCloseRename] = useDialog();
  const [openTransfer, handleOpenTransfer, handleCloseTransfer] = useDialog();

  const [, drop] = useDrop({
    accept: 'draggable-field',
    drop: (dropItem) => {
      createFormElement((dropItem as unknown) as FormElement);
    },
  });

  const handleChange = React.useCallback(
    (_: any, newValue: any) => {
      setActiveGroup(newValue);
    },
    [setActiveGroup]
  );

  const handleAddGroup = React.useCallback(() => {
    addGroup(`Group ${groupings.groups.length}`);
  }, [addGroup, groupings.groups.length]);

  const handleGroupRename = React.useCallback(() => {
    renameGroup(customizedGroupName);
    setCustomizedGroupName('');
    handleCloseRename();
  }, [customizedGroupName, handleCloseRename, renameGroup]);

  const handleGroupRenameOpen = React.useCallback(() => {
    setCustomizedGroupName(ActiveGroupName || '');
    handleOpenRename();
  }, [ActiveGroupName, handleOpenRename]);

  const handleGroupDelete = React.useCallback(() => {
    deleteGroup();
    handleCloseDelete();
  }, [deleteGroup, handleCloseDelete]);

  const getGroupNumberOfGroupElements = React.useCallback(
    (groupId: string) =>
      allElements.filter((el) => el.groupID === groupId).length,
    [allElements]
  );

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      style={{ height: '100%', width: '100%' }}
    >
      <Box
        width={'100%'}
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        paddingBottom={1}
      >
        <Button variant={'outlined'} onClick={handleOpenTransfer}>
          Data Transfer
        </Button>
        <ButtonGroup
          color="primary"
          size={'small'}
          aria-label="outlined primary button group"
          // className={classes.buttonGroup}
        >
          <Button onClick={handleAddGroup}>Add Group</Button>
          <Button onClick={handleGroupRenameOpen}>Rename Active Group</Button>,
          {groupings.groups.length > 1 && (
            <Button onClick={handleOpenDelete}>Delete Group</Button>
          )}
        </ButtonGroup>
      </Box>
      <Paper ref={drop} className={classes.root} variant={'outlined'}>
        {groupings.groups.length > 0 && (
          <AppBar position="static" color="default" elevation={0}>
            <Tabs
              value={groupings.activeGroup}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons={'auto'}
              aria-label="simple tabs example"
            >
              {groupings.groups.map((group, i) => (
                <DraggableTag
                  key={group.id}
                  value={group.id}
                  label={group.name}
                  number={getGroupNumberOfGroupElements(group.id)}
                  id={group.id}
                  index={i}
                  swap={swapGroups}
                />
              ))}
            </Tabs>
          </AppBar>
        )}
        {/*todo: do dropIndication*/}
        {/*{dropIndicationActive && <DropIndicator />}*/}
        {groupings.groups.map((group) => (
          <TabPanel
            key={group.id}
            value={groupings.activeGroup}
            index={group.id}
            className={classes.dropArea}
          >
            <FormElementsContainer />
          </TabPanel>
        ))}
      </Paper>

      {/*  Dialogs  */}
      <ConfirmationDialog
        opened={openDelete}
        title={`Are you sure to delete ${ActiveGroupName}?`}
        text={'You will lose its form progress'}
        onSuccess={handleGroupDelete}
        onDeny={handleCloseDelete}
      />
      <CustomDialog
        opened={openRename}
        title={`Enter new name for ${ActiveGroupName}`}
        onSuccess={handleGroupRename}
        onDeny={handleCloseRename}
      >
        <TextField
          autoFocus={true}
          value={customizedGroupName}
          onChange={(e) => setCustomizedGroupName(e.target.value)}
          label="New name"
          margin="dense"
          id="name"
        />
      </CustomDialog>
      <RfaSchemaTransferer open={openTransfer} onClose={handleCloseTransfer} />
    </Box>
  );
};
