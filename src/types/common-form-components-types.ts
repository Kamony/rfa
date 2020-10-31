import { Control, FieldError, useForm } from "react-hook-form";

export type FormContextType = {
  register: ReturnType<typeof useForm>["register"];
  name: string;
};

export type FormControlType = {
  control: Control;
  name: string;
};

export type FormCustomRegisterType = FormContextType & {
  setValue: ReturnType<typeof useForm>["setValue"];
  unregister: ReturnType<typeof useForm>["unregister"];
};

export type FormFieldError = {
  error?: FieldError;
};
