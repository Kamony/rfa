import React from 'react';

import { uuid } from '../utils/uuid';
import { useStore } from '../store/store';

export const useNameGenerator = () => {
  const [elements] = useStore((s) => s.elements);

  const isUniqueName = React.useCallback(
    (name: string) => {
      const names = elements.map((el) => el.name);
      return !names.includes(name);
    },
    [elements]
  );

  const createName = React.useCallback(
    (label: string) => {
      const cleanName = label.trim().replace(/\s+/g, '_').toLowerCase();
      return isUniqueName(cleanName) ? cleanName : `${cleanName}-${uuid()}`;
    },
    [isUniqueName]
  );

  const createNameById = React.useCallback(
    (id: string) => {
      const element = elements.find((el) => el.id === id);
      if (!element) {
        return '';
      }
      return createName(element.label);
    },
    [createName, elements]
  );

  return { createName, createNameById };
};
