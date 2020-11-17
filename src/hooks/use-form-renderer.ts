import React from 'react';

import type { FormStoredElementType, FormSchemaType } from '../store/store';
export type GroupedFormData = { [groupName: string]: FormStoredElementType[] };

export const useFormRenderer = (data: FormSchemaType) => {
  const Elements = React.useMemo(() => data.elements, [data]);
  const Groups = React.useMemo(() => data.grouping.groups, [data]);

  const getGroupName = React.useCallback(
    (groupId: string) => Groups.find((group) => group.id === groupId)?.name,
    [Groups]
  );

  const GroupReducedElements = React.useMemo(
    () =>
      Elements.reduce((acc, el) => {
        const key = getGroupName(el.groupID) ?? '';
        return {
          ...acc,
          [key]: [...(acc[key] ?? []), el],
        };
      }, {} as GroupedFormData),
    [Elements, getGroupName]
  );

  const shouldRenderGroups = React.useMemo(() => Groups.length > 1, [Groups]);

  return {
    data: {
      GroupReducedElements,
    },
    state: {
      shouldRenderGroups,
    },
  };
};
