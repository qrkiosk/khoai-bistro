import React, { useCallback } from "react";
import { useAtomValue } from "jotai";
import { Box, Button, useBoolean, useToast } from "@chakra-ui/react";
import { Payment } from "zmp-sdk";

import { cartAtom, tableInfoAtom, userInfoAtom } from "../../../state";
import { APP_ACCENT_COLOR } from "../../../utils/constants";
import { buildOrder } from "../../../utils/order";
import {
  createMerchantSideOrder,
  queryMerchantSideOrder,
} from "../../../api/order";

const PlaceOrderButton = () => {
  const toast = useToast();
  const [isLoading, { on: showLoading, off: hideLoading }] = useBoolean();

  const { data: table } = useAtomValue(tableInfoAtom);
  const cart = useAtomValue(cartAtom);
  const customer = useAtomValue(userInfoAtom);

  const onClickPlaceOrder = useCallback(async () => {
    if (table == null) {
      toast({
        title: "Chưa thể đặt đơn vào lúc này.",
        description: "Lỗi: Thiếu thông tin bàn hoặc quán.",
        status: "error",
        duration: 8000,
        isClosable: true,
      });
      return;
    }

    if (customer == null) {
      toast({
        title: "Chưa thể đặt đơn vào lúc này.",
        description: "Lỗi: Thiếu thông tin khách hàng.",
        status: "error",
        duration: 8000,
        isClosable: true,
      });
      return;
    }

    showLoading();

    try {
      const orderData = buildOrder({ table, customer, cart });
      const createMSOrderResult = await createMerchantSideOrder(orderData);
      const { id: orderId, companyId, storeId } = createMSOrderResult.data.data;

      const queryMSOrderResult = await queryMerchantSideOrder({
        orderId,
        companyId,
        storeId,
      });
      const merchantSideOrder = queryMSOrderResult.data.data;
      console.log(merchantSideOrder);

      // TODO: Call Payment.createOrder here to create a Zalo-side order
      // and proceed to show payment list
    } catch (error: any) {
      toast({
        title: "Xảy ra lỗi trong quá trình lên đơn 😢",
        description: error?.message,
        status: "error",
        duration: 8000,
        isClosable: true,
      });
    } finally {
      hideLoading();
    }
  }, [table, customer, cart]);

  return (
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
        isLoading={isLoading}
        onClick={onClickPlaceOrder}
      >
        Xác nhận đặt đơn
      </Button>
    </Box>
  );
};

export default PlaceOrderButton;
