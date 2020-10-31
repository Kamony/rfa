import React from "react";
import { TextInput, TextInputProps } from "./text-input";

export const NumberInput = (props: TextInputProps) => {
  return <TextInput {...props} type={"number"} />;
};
