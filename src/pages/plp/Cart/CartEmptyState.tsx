import React from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";

import { useCartDrawer } from "../../../hooks";
import { APP_ACCENT_COLOR } from "../../../utils/constants";

const CartEmptyState = () => {
  const { onClose } = useCartDrawer();

  return (
    <Box className="safe-area px-4 flex-1 flex flex-col items-center justify-center">
      <Heading size="md">Giỏ hàng trống</Heading>
      <Text color="GrayText" fontSize="sm" mt={3} mb={5}>
        Hãy thêm gì đó vào đây để làm mình vui nhé!
      </Text>
      <Button colorScheme={APP_ACCENT_COLOR} mt={5} onClick={onClose}>
        Tiếp tục mua sắm
      </Button>
    </Box>
  );
};

export default CartEmptyState;
