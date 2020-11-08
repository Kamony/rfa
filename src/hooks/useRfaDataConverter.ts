import { useComponentStore } from '../store/componentStore';
import React from 'react';
import type { IState } from '..';
import type { ExportedDataType } from './useDataExporter';

export const useRfaDataConverter = () => {
  const [components, addComponents] = useComponentStore(
    (s) => s.components,
    (a) => a.addComponents
  );

  const dataToExport = React.useCallback(
    (store: IState): ExportedDataType => ({
      grouping: store.grouping,
      elements: store.elements.map((element) => ({
        ...element,
        render: element.render.name,
      })),
    }),
    []
  );
  const dataToStore = React.useCallback(
    (data: ExportedDataType): IState => ({
      grouping: data.grouping,
      elements: data.elements.map((element: any) => ({
        ...element,
        render:
          components.find((component) => component.name === element.render) ??
          (() => null),
      })),
    }),
    [components]
  );

  const registerComponents = React.useCallback(
    (components: React.FC<any>[]) => {
      addComponents(components);
    },
    [components]
  );

  const isExportedJson = React.useCallback(
    (data: IState | ExportedDataType): data is ExportedDataType => {
      return typeof data.elements[0].render === 'string';
    },
    []
  );

  return {
    handlers: {
      dataToExport,
      dataToStore,
      registerComponents,
    },
    state: {
      isExportedJson,
    },
  };
};
