import { useGrouping } from "../hooks";
import React, { useState } from "react";
import { CustomDialog } from "./dialogs/custom-dialog";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

type GroupChooserProps = {
  open: boolean;
  onSuccess: (groupId: string) => void;
  onClose: () => void;
};

export const GroupChooserDialog = (props: GroupChooserProps) => {
  const { groupings, ActiveGroupName } = useGrouping();
  const [group, setGroup] = useState(groupings.activeGroup || "");

  const handleChangeGroup = React.useCallback(() => {
    if (groupings.activeGroup === group) {
      props.onClose();
      return;
    }
    props.onSuccess(group);
    props.onClose();
  }, [group, groupings.activeGroup, props]);

  return (
    <CustomDialog
      opened={props.open}
      onSuccess={handleChangeGroup}
      onDeny={props.onClose}
      title={`Transfer ${ActiveGroupName} to new group`}
    >
      <FormControl style={{ width: "100%" }}>
        <InputLabel id="group-select">Group to transfer</InputLabel>
        <Select
          labelId="group-select"
          id="group-select"
          value={group}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
            setGroup(e.target.value as string)
          }
        >
          {groupings.groups.map((group) => (
            <MenuItem value={group.id} key={group.id}>
              {group.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </CustomDialog>
  );
};
