import React from "react";
import { useAtomValue } from "jotai";
import { Box, Button, Grid, GridItem, Heading, Text } from "@chakra-ui/react";

import { cartAtom, cartSubtotalAtom } from "../../../state";
import { useCartDrawer } from "../../../hooks";
import { APP_ACCENT_COLOR } from "../../../utils/constants";
import { Price } from "../../../components/prices";
import Divider from "../../../components/Divider";
import CartItem from "./CartItem";

const CartSummary = () => {
  const { onClose } = useCartDrawer();
  const cart = useAtomValue(cartAtom);
  const subtotal = useAtomValue(cartSubtotalAtom);

  return (
    <>
      <Divider />
      <Box p={4} bgColor="var(--zmp-background-white)">
        <Grid templateColumns="repeat(3, 1fr)">
          <GridItem colSpan={2}>
            <Box h="100%" display="flex" alignItems="center">
              <Heading size="sm">Tóm tắt đơn hàng</Heading>
            </Box>
          </GridItem>
          <GridItem colSpan={1}>
            <Box
              h="100%"
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Button
                p={0}
                colorScheme={APP_ACCENT_COLOR}
                variant="ghost"
                size="xs"
                _hover={{ bg: "none" }}
                onClick={onClose}
              >
                Thêm món
              </Button>
            </Box>
          </GridItem>

          {cart.items.map((item) => (
            <CartItem>{item}</CartItem>
          ))}

          <GridItem colSpan={2}>
            <Text fontSize="sm" mt={5}>
              Tổng tạm tính
            </Text>
          </GridItem>
          <GridItem colSpan={1}>
            <Price variant="standard" textAlign="right" mt={5}>
              {subtotal}
            </Price>
          </GridItem>

          <GridItem colSpan={2}>
            <Text fontSize="sm" mt={1}>
              Giảm giá
            </Text>
          </GridItem>
          <GridItem colSpan={1}>
            <Price variant="standard" textAlign="right" mt={1}>
              {0}
            </Price>
          </GridItem>

          <GridItem colSpan={2}>
            <Text fontSize="sm" fontWeight="bold" mt={1}>
              Tổng thanh toán
            </Text>
          </GridItem>
          <GridItem colSpan={1}>
            <Price variant="total" textAlign="right" mt={1}>
              {subtotal}
            </Price>
          </GridItem>
        </Grid>
      </Box>
      <Divider />
    </>
  );
};

export default CartSummary;
