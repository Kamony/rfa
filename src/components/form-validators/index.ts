import { useForm } from "react-hook-form";

export type ValidatorCommonProps = {
  disabledParam: boolean;
  register: ReturnType<typeof useForm>["register"];
  name: string;
};

export { Max } from "./mixed/max";
export { Min } from "./mixed/min";
export { Regex } from "./mixed/regex";
export { Required } from "./mixed/required";

export { Integer } from "./number/integer";
export { LessThan } from "./number/less-than";
export { MoreThan } from "./number/more-than";
export { Negative } from "./number/negative";
export { Positive } from "./number/positive";

export { Length } from "./string/length";
export { Email } from "./string/email";
export { Url } from "./string/url";
