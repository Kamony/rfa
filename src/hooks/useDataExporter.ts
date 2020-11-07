import React from 'react';
import { IState, useStore } from '../store/store';
import { useComponentStore } from '../store/componentStore';

type ExportedDataType = {
  grouping: IState['grouping'];
  elements: (Omit<IState['elements'][0], 'render'> & { render: string })[];
};

export const useDataExporter = () => {
  const [store, storeActions] = useStore(
    (s) => s,
    (a) => a.storeActions
  );
  const [components] = useComponentStore((s) => s.components);
  const [copied, setCopied] = React.useState(false);
  const [exported, setExported] = React.useState(false);
  const [imported, setImported] = React.useState(false);

  const getStringData = React.useCallback(() => JSON.stringify(store), [store]);

  const replaceComponentsByNames = React.useCallback(
    (store: IState): ExportedDataType => ({
      grouping: store.grouping,
      elements: store.elements.map((element) => ({
        ...element,
        render: element.render.name,
      })),
    }),
    []
  );
  const replaceNamesByComponent = React.useCallback(
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
  const saveAsJSON = React.useCallback(() => {
    const storeToExport = replaceComponentsByNames(store);
    console.log({ storeToExport });
    const stringData = JSON.stringify(storeToExport);
    let out = [];
    for (let i = 0; i < stringData.length; i++) {
      out[i] = stringData.charCodeAt(i);
    }

    const data = new Uint8Array(out);
    const blob = new Blob([data], {
      type: 'application/octet-stream',
    });
    const url = URL.createObjectURL(blob);
    let link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'small_step_for_rfa.json');
    link.click();
    setExported(true);
  }, [getStringData]);

  const isTypeofState = (data: any): data is ExportedDataType => {
    return !!(
      (data as ExportedDataType).elements &&
      (data as ExportedDataType).elements.length &&
      (data as ExportedDataType).elements[0].id &&
      (data as ExportedDataType).elements[0].name &&
      (data as ExportedDataType).elements[0].groupID &&
      (data as ExportedDataType).grouping
    );
  };

  const importData = React.useCallback(
    (jsonData: object) => {
      if (!isTypeofState(jsonData)) {
        alert('import unsuccessful, wrong type!');
        setImported(false);
        return;
      }
      const storeData = replaceNamesByComponent(jsonData);
      storeActions.clearStore();
      storeActions.setStore(storeData);
      setImported(true);
    },
    [storeActions, replaceNamesByComponent]
  );

  const copyToClipboard = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(getStringData());
      setCopied(true);
    } catch (e) {
      console.log(e);
      setCopied(false);
    }
  }, [getStringData]);

  return {
    handlers: {
      saveAsJSON,
      importData,
      copyToClipboard,
    },
    state: {
      copied,
      exported,
      imported,
    },
  };
};
