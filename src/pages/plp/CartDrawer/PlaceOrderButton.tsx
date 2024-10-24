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
import { delay } from "../../../utils";
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
    showLoading();

    try {
      if (table == null) {
        throw new Error(
          "Chưa thể tiến hành đặt đơn: Thiếu thông tin bàn hoặc quán."
        );
      }

      if (customer == null) {
        throw new Error(
          "Chưa thể tiến hành đặt đơn: Thiếu thông tin khách hàng."
        );
      }

      const orderData = buildOrder({ table, customer, cart });
      const createMSOrderResult = await createMerchantSideOrder(orderData);
      const { id: orderId, companyId, storeId } = createMSOrderResult.data.data;

      await delay(600); // wait for merchant server to complete all operations related to the order

      const queryMSOrderResult = await queryMerchantSideOrder({
        orderId,
        companyId,
        storeId,
      });
      const merchantSideOrder = queryMSOrderResult.data.data;

      if (!merchantSideOrder.isActive) {
        throw new Error(
          "Xảy ra lỗi trong quá trình tạo đơn ở server, quý khách vui lòng thử lại."
        );
      }

      const paymentResult = await Payment.createOrder({
        desc: `Thanh toán đơn hàng ${
          merchantSideOrder.code
        } số tiền ${withThousandSeparators(merchantSideOrder.totalAmount)}`,
        item: merchantSideOrder.details.map((item) => ({
          id: item.id,
          amount: item.totalAmount,
        })),
        amount: 1000, // TODO: Use actual order amount
        extradata: JSON.stringify({
          storeName: store?.name,
          storeId,
          companyId,
          orderId,
          customerId: customer.id,
        }),
      });
      const { orderId: zmpOrderId, messageToken } = paymentResult;

      console.log("Payment.createOrder success", {
        paymentOrderId: zmpOrderId,
        messageToken,
      });
    } catch (error: any) {
      console.log(error);
      toast(
        genErrorToast({
          title: "Tạo đơn hàng không thành công",
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
        Đặt đơn
      </Button>
    </Box>
  );
};

export default PlaceOrderButton;
