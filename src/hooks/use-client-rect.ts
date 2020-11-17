import React from "react";
export const useClientRect = () => {
  const [rect, setRect] = React.useState<ClientRect>();
  const [nodeElement, setNodeElement] = React.useState<HTMLElement>();

  const ref = React.useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
      setNodeElement(node);
    }
  }, []);

  return [rect, ref, nodeElement] as const;
};
