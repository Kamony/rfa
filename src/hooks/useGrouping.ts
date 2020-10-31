import React from "react";
import { useStore } from "../store/store";
import { uuid } from "../utils/uuid";

export const useGrouping = () => {
  const [groupings, actions] = useStore(
    (s) => s.grouping,
    (a) => a.groupingActions
  );

  const addGroup = React.useCallback(
    (name: string) => {
      actions.addGroup({
        id: uuid(),
        name: name,
      });
    },
    [actions]
  );

  const setActiveGroup = React.useCallback(
    (id: string) => {
      actions.setActiveGroup(id);
    },
    [actions]
  );

  const deleteGroup = React.useCallback(() => {
    actions.removeGroup(groupings.activeGroup);
  }, [actions, groupings.activeGroup]);

  const renameGroup = React.useCallback(
    (name: string) => {
      actions.renameGroup(groupings.activeGroup, name);
    },
    [actions, groupings.activeGroup]
  );

  const swapGroups = React.useCallback(
    (...params: Parameters<typeof actions.swapGroups>) => {
      actions.swapGroups(...params);
    },
    [actions]
  );

  const ActiveGroupName = React.useMemo(() => {
    const activeGroup = groupings.groups.find(
      (g) => g.id === groupings.activeGroup
    );
    if (!activeGroup) return null;
    return activeGroup.name;
  }, [groupings.activeGroup, groupings.groups]);

  return {
    groupings,
    addGroup,
    setActiveGroup,
    deleteGroup,
    renameGroup,
    ActiveGroupName,
    swapGroups,
  };
};
