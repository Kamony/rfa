import React from 'react';
import { useRfaDataConverter } from './useRfaDataConverter';
import { useStore } from '../store/store';
import type { FormSchemaType } from '../store/store';

export type ExportedSchemaType = {
  grouping: FormSchemaType['grouping'];
  elements: (Omit<FormSchemaType['elements'][0], 'render'> & {
    render: string;
  })[];
};

export const useDataExporter = () => {
  const [store, storeActions] = useStore(
    (s) => s,
    (a) => a.storeActions
  );

  const {
    handlers: { dataToStore, dataToExport },
  } = useRfaDataConverter();

  const [copied, setCopied] = React.useState(false);
  const [exported, setExported] = React.useState(false);
  const [imported, setImported] = React.useState(false);

  const getStringData = React.useCallback(() => JSON.stringify(store), [store]);

  const saveAsJSON = React.useCallback(() => {
    const storeToExport = dataToExport(store);
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

  const isTypeofState = (data: any): data is ExportedSchemaType => {
    return !!(
      (data as ExportedSchemaType).elements &&
      (data as ExportedSchemaType).elements.length &&
      (data as ExportedSchemaType).elements[0].id &&
      (data as ExportedSchemaType).elements[0].name &&
      (data as ExportedSchemaType).elements[0].groupID &&
      (data as ExportedSchemaType).grouping
    );
  };

  const importData = React.useCallback(
    (jsonData: object) => {
      if (!isTypeofState(jsonData)) {
        alert('import unsuccessful, wrong type!');
        setImported(false);
        return;
      }
      const storeData = dataToStore(jsonData);
      storeActions.clearStore();
      storeActions.setStore(storeData);
      setImported(true);
    },
    [storeActions, dataToStore]
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
