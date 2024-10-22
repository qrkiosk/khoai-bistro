import React from "react";
import { useAtomValue } from "jotai";
import { Box, Button, useBoolean, useToast } from "@chakra-ui/react";
import { Payment } from "zmp-sdk";

import {
  cartAtom,
  storeInfoAtom,
  tableInfoAtom,
  userInfoAtom,
} from "../../../state";
import { APP_ACCENT_COLOR } from "../../../utils/constants";
import { withThousandSeparators } from "../../../utils/number";
import { buildOrder, genErrorToast } from "../../../utils/order";
import {
  createMerchantSideOrder,
  queryMerchantSideOrder,
} from "../../../api/order";

const PlaceOrderButton = () => {
  const toast = useToast();
  const [isLoading, { on: showLoading, off: hideLoading }] = useBoolean();

  const { data: table } = useAtomValue(tableInfoAtom);
  const { data: store } = useAtomValue(storeInfoAtom);
  const cart = useAtomValue(cartAtom);
  const customer = useAtomValue(userInfoAtom);

  const onClickPlaceOrder = async () => {
    if (table == null) {
      toast(
        genErrorToast({
          title: "Chưa thể đặt đơn vào lúc này.",
          description: "Lỗi: Thiếu thông tin bàn hoặc quán.",
        })
      );
      return;
    }

    if (customer == null) {
      toast(
        genErrorToast({
          title: "Chưa thể đặt đơn vào lúc này.",
          description: "Lỗi: Thiếu thông tin khách hàng.",
        })
      );
      return;
    }

    showLoading();

    try {
      const orderData = buildOrder({ table, customer, cart });
      const createMSOrderResult = await createMerchantSideOrder(orderData);
      const {
        id: merchantSideOrderId,
        companyId,
        storeId,
      } = createMSOrderResult.data.data;

      const queryMSOrderResult = await queryMerchantSideOrder({
        orderId: merchantSideOrderId,
        companyId,
        storeId,
      });
      const merchantSideOrder = queryMSOrderResult.data.data;

      const paymentResult = await Payment.createOrder({
        desc: `Thanh toán ${withThousandSeparators(
          merchantSideOrder.totalAmount
        )} cho ${store?.name}`,
        item: merchantSideOrder.details.map((item) => ({
          id: item.id,
          amount: item.totalAmount,
        })),
        amount: 1000,
      });
      const { orderId: paymentOrderId, messageToken } = paymentResult;

      console.log("Payment.createOrder success", {
        paymentOrderId,
        messageToken,
      });
    } catch (error: any) {
      toast(
        genErrorToast({
          title: "Xảy ra lỗi trong quá trình tạo đơn hàng 😢",
          description: error?.message,
        })
      );
    } finally {
      hideLoading();
    }
  };

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
