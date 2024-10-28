import React from "react";
import { useAtomValue } from "jotai";
import isEmpty from "lodash/isEmpty";
import { Box, Drawer, DrawerContent, DrawerOverlay } from "@chakra-ui/react";

import { cartAtom } from "../../../state";
import { useCartDrawer } from "../../../hooks";
import CartEmptyState from "./CartEmptyState";
import CartContent from "./CartContent";
import OpenCartButton from "./OpenCartButton";

const Cart = () => {
  const { isOpen, onClose } = useCartDrawer();
  const cart = useAtomValue(cartAtom);
  const isCartEmpty = isEmpty(cart.items);

  return (
    <>
      {!isCartEmpty && (
        <Box
          className="sticky left-0 right-0 bottom-0 p-3"
          bgColor="var(--zmp-background-white)"
          boxShadow="0px -4px 6px rgba(0, 0, 0, 0.1)"
        >
          <OpenCartButton />
        </Box>
      )}
      <Drawer
        size="full"
        placement="bottom"
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          {isCartEmpty ? <CartEmptyState /> : <CartContent />}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Cart;
