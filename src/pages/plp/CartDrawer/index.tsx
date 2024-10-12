import React, { useEffect } from "react";
import { useAtomValue } from "jotai";
import { Icon } from "zmp-ui";
import isEmpty from "lodash/isEmpty";
import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  Text,
} from "@chakra-ui/react";

import { cartAtom, cartSubtotalAtom } from "../../../state";
import { DisplayPrice } from "../../../components/prices";
import { useCartDrawer } from "./localState";
import CartDetails from "./CartDetails";

const CartDrawer = () => {
  const { isOpen, onOpen, onClose } = useCartDrawer();
  const cart = useAtomValue(cartAtom);
  const subtotal = useAtomValue(cartSubtotalAtom);
  const isCartEmpty = isEmpty(cart.items);

  useEffect(() => {
    if (isCartEmpty) onClose();
  }, [isCartEmpty]);

  return (
    <>
      <Box
        display={isCartEmpty ? "none" : "block"}
        position="sticky"
        left={0}
        right={0}
        bottom={0}
        bgColor="var(--zmp-background-white)"
        p={3}
        onClick={onOpen}
      >
        <Button
          variant="solid"
          colorScheme="green"
          w="100%"
          textAlign="left"
          size="md"
        >
          <Box w="100%" display="flex" justifyContent="space-between">
            <Text>Giỏ hàng • {cart.items.length} món</Text>
            <Text>
              <DisplayPrice>{subtotal}</DisplayPrice>
            </Text>
          </Box>
        </Button>
      </Box>
      <Drawer
        size="full"
        placement="bottom"
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent h="100%" overflowY="auto" className="page-content">
          <Box>
            <IconButton
              ml={3}
              isRound={true}
              variant="outline"
              aria-label="Close"
              bgColor="var(--zmp-background-white)"
              fontSize="16px"
              icon={<Icon icon="zi-close" />}
              onClick={onClose}
            />
          </Box>
          <CartDetails />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
