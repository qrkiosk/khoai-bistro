import React from "react";
import { useAtomValue } from "jotai";
import isEmpty from "lodash/isEmpty";
import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  Heading,
  Text,
} from "@chakra-ui/react";

import { cartAtom, cartSubtotalAtom } from "../../../state";
import { useCartDrawer } from "../../../hooks";
import { APP_ACCENT_COLOR } from "../../../utils/constants";
import { DisplayPrice } from "../../../components/prices";
import CartDetails from "./CartDetails";

const CartDrawer = () => {
  const { isOpen, onOpen, onClose } = useCartDrawer();
  const cart = useAtomValue(cartAtom);
  const subtotal = useAtomValue(cartSubtotalAtom);
  const isCartEmpty = isEmpty(cart.items);

  return (
    <>
      {!isCartEmpty && (
        <Box
          position="sticky"
          left={0}
          right={0}
          bottom={0}
          bgColor="var(--zmp-background-white)"
          boxShadow="0px -4px 6px rgba(0, 0, 0, 0.1)"
          p={3}
        >
          <Button
            variant="solid"
            autoFocus={false}
            colorScheme={APP_ACCENT_COLOR}
            w="100%"
            textAlign="left"
            size="lg"
            onClick={onOpen}
          >
            <Box w="100%" display="flex" justifyContent="space-between">
              <Text>Giỏ hàng • {cart.items.length} món</Text>
              <DisplayPrice variant="unstyled" size="lg">
                {subtotal}
              </DisplayPrice>
            </Box>
          </Button>
        </Box>
      )}
      <Drawer
        size="full"
        placement="bottom"
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <DrawerContent>
          {isCartEmpty ? (
            <Box className="safe-area px-4 flex-1 flex flex-col items-center justify-center">
              <Heading size="md">Giỏ hàng trống</Heading>
              <Text color="GrayText" fontSize="sm" mt={3} mb={5}>
                Hãy thêm gì đó vào đây để làm mình vui nhé!
              </Text>
              <Button colorScheme={APP_ACCENT_COLOR} mt={5} onClick={onClose}>
                Tiếp tục mua sắm
              </Button>
            </Box>
          ) : (
            <CartDetails />
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
