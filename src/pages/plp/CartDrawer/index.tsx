import React from "react";
import { useAtomValue } from "jotai";
import { Icon } from "zmp-ui";
import isEmpty from "lodash/isEmpty";
import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";

import { cartAtom, cartSubtotalAtom } from "../../../state";
import { useCartDrawer } from "../../../hooks";
import { APP_ACCENT_COLOR } from "../../../utils/constants";
import { DisplayPrice } from "../../../components/prices";
import Divider from "../../../components/Divider";
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
          p={3}
        >
          <Button
            variant="solid"
            autoFocus={false}
            colorScheme={APP_ACCENT_COLOR}
            w="100%"
            textAlign="left"
            size="md"
            onClick={onOpen}
          >
            <Box w="100%" display="flex" justifyContent="space-between">
              <Text>Giỏ hàng • {cart.items.length} món</Text>
              <Text>
                <DisplayPrice>{subtotal}</DisplayPrice>
              </Text>
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
        <DrawerOverlay />
        <DrawerContent h="100%" overflowY="auto" className="safe-area">
          <Box>
            <IconButton
              ml={3}
              isRound={true}
              autoFocus={false}
              variant="ghost"
              aria-label="Close"
              bgColor="var(--zmp-background-white)"
              _hover={{ bg: "none" }}
              fontSize="md"
              icon={<Icon icon="zi-arrow-left" />}
              onClick={onClose}
            />
            <Divider />
          </Box>
          {isCartEmpty ? (
            <Box
              h="80%"
              p={4}
              display="flex"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
            >
              <Heading size="md">Giỏ hàng của bạn đang trống</Heading>
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
