import { useCallback } from "react";
import { atom, useAtom } from "jotai";

const isCartDrawerOpenAtom = atom(false);

export const useCartDrawer = () => {
  const [isOpen, setIsOpen] = useAtom(isCartDrawerOpenAtom);
  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  return { isOpen, onOpen, onClose };
};
