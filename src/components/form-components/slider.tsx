import React from "react";
import {
  FormCustomRegisterType,
  FormFieldError,
} from "../../types/common-form-components-types";
import {
  FormHelperText,
  FormLabel,
  Slider as MUISlider,
  SliderProps as MUIProps,
} from "@material-ui/core";
import { FormComponentWrapper } from "../../containers";
import { theme } from "../../theme";

export type SliderProps = FormCustomRegisterType &
  FormFieldError & {
    label: string;
    helperText?: string;
  } & Exclude<MUIProps, "label" | FormCustomRegisterType>;

export const Slider = ({
  label,
  name,
  helperText,
  unregister,
  register,
  setValue,
  error,
  ...sliderProps
}: SliderProps) => {
  //Custom form context registration with cleanup
  React.useEffect(() => {
    register({ name });
    setValue(name, sliderProps.min);
    return () => unregister(name);
  }, [name, register, setValue, sliderProps.min, unregister]);

  const handleChange = React.useCallback(
    (_: React.ChangeEvent<{}>, value: number | number[]) => {
      setValue(name, value);
    },
    [name, setValue]
  );
  return (
    <FormComponentWrapper error={!!error?.message}>
      <FormLabel component="legend" style={{ marginBottom: theme.spacing(1) }}>
        {label}
      </FormLabel>
      <MUISlider
        {...sliderProps}
        min={Number(sliderProps.min)}
        max={Number(sliderProps.max)}
        name={name}
        color={"secondary"}
        aria-labelledby={name}
        onChange={handleChange}
        valueLabelDisplay="auto"
        defaultValue={Number(sliderProps.min)}
        marks={[
          {
            label: sliderProps.min!,
            value: Number(sliderProps.min!),
          },
          {
            label: sliderProps.max!,
            value: Number(sliderProps.max!),
          },
        ]}
      />
      {(helperText || error?.message) && (
        <FormHelperText error={!!error?.message}>
          {error?.message ?? helperText}
        </FormHelperText>
      )}
    </FormComponentWrapper>
  );
};
