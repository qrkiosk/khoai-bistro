import { useCallback } from "react";
import { atom, useAtom } from "jotai";

const isCategoryDrawerOpenAtom = atom(false);

export const useCategoryDrawer = () => {
  const [isOpen, setIsOpen] = useAtom(isCategoryDrawerOpenAtom);
  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  return { isOpen, onOpen, onClose };
};
