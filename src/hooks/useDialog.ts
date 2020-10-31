import { useCallback, useState } from "react";

export const useDialog = (init = false): [boolean, () => void, () => void] => {
  const [open, setOpen] = useState<boolean>(init);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return [open, handleOpen, handleClose];
};
