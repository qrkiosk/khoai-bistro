import { useCallback } from "react";
import { atom, useAtom, useSetAtom } from "jotai";

import {
  isEditingCartItemAtom,
  selectedProductIdAtom,
  productVariantAtom,
} from "../../../state";

const isProductDrawerOpenAtom = atom(false);

export const useProductDrawer = () => {
  const [isOpen, setIsOpen] = useAtom(isProductDrawerOpenAtom);
  const setSelectedProductId = useSetAtom(selectedProductIdAtom);
  const setIsEditingCartItem = useSetAtom(isEditingCartItemAtom);
  const setProductVariant = useSetAtom(productVariantAtom);

  const onOpen = useCallback(() => setIsOpen(true), []);

  const resetGlobalState = useCallback(() => {
    setSelectedProductId(null);
    setIsEditingCartItem(false);
    setProductVariant(null);
  }, []);

  const onClose = useCallback(() => {
    resetGlobalState();
    setIsOpen(false);
  }, []);

  return { isOpen, onOpen, onClose, resetGlobalState };
};
