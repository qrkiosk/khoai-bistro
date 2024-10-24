import React from "react";
import { useAtomValue } from "jotai";
import { Box, Button, Text, useBoolean, useToast } from "@chakra-ui/react";
import { Payment } from "zmp-sdk";

import {
  cartAtom,
  cartSubtotalAtom,
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
import { DisplayPrice } from "../../../components/prices";

const PlaceOrderButton = () => {
  const toast = useToast();
  const [isLoading, { on: showLoading, off: hideLoading }] = useBoolean();

  const { data: table } = useAtomValue(tableInfoAtom);
  const { data: store } = useAtomValue(storeInfoAtom);
  const cart = useAtomValue(cartAtom);
  const customer = useAtomValue(userInfoAtom);
  const subtotal = useAtomValue(cartSubtotalAtom);

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

      await delay(500); // Wait for merchant server to complete all operations related to the order

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
        amount: merchantSideOrder.totalAmount,
        extradata: JSON.stringify({
          storeName: store?.name,
          storeId,
          companyId,
          orderId,
          customerId: customer.id,
          orderCode: merchantSideOrder.code,
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
      boxShadow="0px -4px 6px rgba(0, 0, 0, 0.1)"
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
        <Box w="100%" display="flex" justifyContent="space-between">
          <Text>Đặt đơn</Text>
          <Text>
            <DisplayPrice>{subtotal}</DisplayPrice>
          </Text>
        </Box>
      </Button>
    </Box>
  );
};

export default PlaceOrderButton;
