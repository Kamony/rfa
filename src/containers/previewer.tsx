import React from "react";
import {RFARenderer} from "./rfa-renderer";
import {useStore} from "../store/store";
import {FieldValues} from "react-hook-form";

export const Previewer = () => {
  const [storeData] = useStore((s) => s);

  const onSubmit = (data: FieldValues) => {
    console.log({ data });
  };

  return <RFARenderer data={storeData as any} onSubmit={onSubmit} />;
};
