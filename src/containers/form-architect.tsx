import React from "react";
import { useForm } from "react-hook-form";
import { Box } from "@material-ui/core";
import { useFormElements } from "../hooks";
import { FormBuildElement } from "../components";

export const FormArchitect = () => {
  const { register, handleSubmit, control, setValue, unregister } = useForm();

  const { elements } = useFormElements();
  const onSubmit = (data: any) => console.log({ data });
  return (
    <Box p={1} width={"100%"} height={"100%"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {elements.map((element, index) => (
          <FormBuildElement
            key={element.id}
            element={element}
            index={index}
            formContextRegistration={{
              register,
              control,
              setValue,
              unregister,
            }}
          />
        ))}
      </form>
    </Box>
  );
};
