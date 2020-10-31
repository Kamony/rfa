import React from "react";
import { IState, useStore } from "../store/store";

export const useDataExporter = () => {
  const [store, storeActions] = useStore(
    (s) => s,
    (a) => a.storeActions
  );

  const [copied, setCopied] = React.useState(false);
  const [exported, setExported] = React.useState(false);
  const [imported, setImported] = React.useState(false);

  const StringData = React.useMemo(() => JSON.stringify(store), [store]);
  const FormattedStringData = React.useMemo(
    () => JSON.stringify(store, null, 4),
    [store]
  );

  const saveAsJSON = React.useCallback(() => {
    let out = [];
    for (let i = 0; i < FormattedStringData.length; i++) {
      out[i] = FormattedStringData.charCodeAt(i);
    }

    const data = new Uint8Array(out);
    const blob = new Blob([data], {
      type: "application/octet-stream",
    });
    const url = URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "small_step_for_rfa.json");
    link.click();
    setExported(true);
  }, [FormattedStringData]);

  const isTypeofState = (data: any): data is IState => {
    return !!(
      (data as IState).elements &&
      (data as IState).elements.length &&
      (data as IState).elements[0].id &&
      (data as IState).elements[0].name &&
      (data as IState).elements[0].groupID &&
      (data as IState).grouping
    );
  };

  const importData = React.useCallback(
    (jsonData: object) => {
      if (!isTypeofState(jsonData)) {
        alert("import unsuccessful, wrong type!");
        setImported(false);
        return;
      }
      storeActions.clearStore();
      storeActions.setStore(jsonData);
      setImported(true);
    },
    [storeActions]
  );

  const copyToClipboard = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(StringData);
      setCopied(true);
    } catch (e) {
      console.log(e);
      setCopied(false);
    }
  }, [StringData]);

  return {
    data: {
      StringData,
      FormattedStringData,
    },
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
