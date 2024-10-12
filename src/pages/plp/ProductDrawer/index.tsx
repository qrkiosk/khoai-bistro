import React, { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAtomValue } from "jotai";
import { Icon } from "zmp-ui";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  Text,
} from "@chakra-ui/react";

import { isEditingCartItemAtom, selectedProductIdAtom } from "../../../state";
import { useProductDrawer } from "./localState";
import ProductDetails from "./ProductDetails";

const ProductDrawer = () => {
  const selectedProductId = useAtomValue(selectedProductIdAtom);
  const isEditingCartItem = useAtomValue(isEditingCartItemAtom);
  const { isOpen, onOpen, onClose, resetGlobalState } = useProductDrawer();

  useEffect(() => {
    if (selectedProductId != null || isEditingCartItem) onOpen();
  }, [selectedProductId, isEditingCartItem]);

  useEffect(() => () => resetGlobalState(), []);

  return (
    <Drawer
      size="full"
      placement="bottom"
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent h="100%" overflowY="auto">
        <IconButton
          isRound={true}
          position="absolute"
          top="var(--zaui-safe-area-inset-top, 16px)"
          left={3}
          variant="outline"
          aria-label="Close"
          bgColor="var(--zmp-background-white)"
          fontSize="16px"
          zIndex={999}
          icon={<Icon icon="zi-close" />}
          onClick={onClose}
        />
        <ErrorBoundary
          fallback={<Text fontSize={14}>Lỗi: Không thể tải sản phẩm...</Text>}
        >
          <ProductDetails />
        </ErrorBoundary>
      </DrawerContent>
    </Drawer>
  );
};

export default ProductDrawer;
