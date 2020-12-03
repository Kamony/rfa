import React from "react";

export const useRetractableString = (original: string, retractable: string) => {
  const [active, setActive] = React.useState(original);

  const retractString = () => {
    setActive(retractable);

    setTimeout(() => {
      setActive(original);
    }, 3000);
  };

  return {
    text: active,
    retractString,
  };
};
