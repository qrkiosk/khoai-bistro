import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

import { PaymentResult } from "../../types/order";
import {
  IconPaymentFail,
  IconPaymentLoading,
  IconPaymentSuccess,
} from "./icons";

type ResultTemplateProps = {
  title?: string;
  message: string;
  icon: React.ReactNode;
};

type CheckoutResultProps = {
  data: PaymentResult | null;
};

const ResultTemplate = ({ title, message, icon }: ResultTemplateProps) => (
  <Box className="flex-1 flex flex-col justify-center items-center text-center px-6 space-y-3">
    <Box p={4}>{icon}</Box>
    {title && <Heading size="md">{title}</Heading>}
    <Text color="GrayText">{message}</Text>
  </Box>
);

const ResultAnnouncement = ({ data }: CheckoutResultProps) => {
  if (data == null || data.resultCode === 0) {
    return (
      <ResultTemplate
        message="Hệ thống đang xử lý thanh toán, vui lòng chờ trong giây lát..."
        icon={<IconPaymentLoading />}
      />
    );
  }

  if (data.resultCode === 1) {
    return (
      <ResultTemplate
        title="Thanh toán thành công"
        message="Đơn hàng của bạn đã được thanh toán thành công và sẽ được xử lý trong thời gian sớm nhất."
        icon={<IconPaymentSuccess />}
      />
    );
  }

  return (
    <ResultTemplate
      title="Thanh toán thất bại"
      message="Có lỗi trong quá trình xử lý, vui lòng kiểm tra lại hoặc liên hệ quán để được hỗ trợ."
      icon={<IconPaymentFail />}
    />
  );
};

export default ResultAnnouncement;
