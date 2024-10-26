import React from "react";
import { Box } from "@chakra-ui/react";

import CartHeader from "./CartHeader";
import CartSummary from "./CartSummary";
import CartShippingInfo from "./CartShippingInfo";
import PlaceOrderButton from "./PlaceOrderButton";

const CartContent = () => {
  return (
    <Box display="flex" flexDir="column" h="100%">
      <CartHeader />

      <Box flexGrow={1} overflowY="auto" bgColor="var(--zmp-background-color)">
        <CartSummary />
        <CartShippingInfo />
      </Box>

      <PlaceOrderButton />
    </Box>
  );
};

export default CartContent;
