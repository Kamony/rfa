import React from "react";
import { Select, SelectProps } from "./select";

export const SelectMulti = (props: SelectProps) => {
  return <Select {...props} multiple={true} />;
};
