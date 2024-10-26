import React from "react";
import { useAtomValue } from "jotai";
import { Box, Button, Text } from "@chakra-ui/react";

import { cartSubtotalAtom, cartTotalQtyAtom } from "../../../state";
import { useCartDrawer } from "../../../hooks";
import { APP_ACCENT_COLOR } from "../../../utils/constants";
import { Price } from "../../../components/prices";

const OpenCartButton = () => {
  const { onOpen } = useCartDrawer();
  const subtotal = useAtomValue(cartSubtotalAtom);
  const cartTotalQty = useAtomValue(cartTotalQtyAtom);

  return (
    <Button
      variant="solid"
      autoFocus={false}
      colorScheme={APP_ACCENT_COLOR}
      w="100%"
      borderRadius="lg"
      textAlign="left"
      size="lg"
      onClick={onOpen}
    >
      <Box w="100%" display="flex" justifyContent="space-between">
        <Text>Giỏ hàng • {cartTotalQty} món</Text>
        <Price variant="unstyled" size="lg">
          {subtotal}
        </Price>
      </Box>
    </Button>
  );
};

export default OpenCartButton;
