import { FormStoredElementType, GroupType, IState } from "./store";
import { StoreActions } from "react-simple-hook-store";

export type GroupingActions = {
  addGroup: (group: GroupType) => void;
  setActiveGroup: (id: string) => void;
  removeGroup: (id: string) => void;
  renameGroup: (id: string, name: string) => void;
  swapGroups: (index: number, newPositionIndex: number) => void;
};

export const groupingActions: StoreActions<IState, GroupingActions> = {
  addGroup: (store, group) => {
    store.setState({
      grouping: {
        activeGroup: group.id,
        groups: [...store.state.grouping.groups, group],
      },
    });
  },
  setActiveGroup: (store, id) => {
    store.setState({
      grouping: {
        groups: [...store.state.grouping.groups],
        activeGroup: id,
      },
    });
  },
  removeGroup: (store, id) => {
    if (store.state.grouping.groups.length === 1) {
      return null;
    }
    const newActiveGroup = store.state.grouping.groups.find((g) => g.id !== id);
    store.setState({
      grouping: {
        groups: [...store.state.grouping.groups.filter((g) => g.id !== id)],
        activeGroup: newActiveGroup?.id ?? store.state.grouping.groups[0].id,
      },
      elements: [
        ...store.state.elements.filter((el) => el.groupID !== id),
      ] as FormStoredElementType[],
    });
    return null
  },
  renameGroup: (store, id, name) => {
    const groups = [...store.state.grouping.groups];
    const group = groups.find((g) => g.id === id);
    const groupIndex = groups.findIndex((g) => g.id === id);
    console.log({ group, groupIndex });
    if (!group || groupIndex === -1) {
      return null;
    }

    const updatedGroup: GroupType = {
      ...group,
      name,
    };

    groups.splice(groupIndex, 1, updatedGroup);
    store.setState({
      grouping: {
        groups,
        activeGroup: store.state.grouping.activeGroup,
      },
    });
    return null
  },
  swapGroups: (store, oldIndex, newIndex) => {
    const groups = [...store.state.grouping.groups] as GroupType[];
    groups[oldIndex] = groups.splice(newIndex, 1, groups[oldIndex])[0];
    store.setState({
      grouping: {
        groups,
        activeGroup: store.state.grouping.activeGroup,
      },
    });
  },
};
