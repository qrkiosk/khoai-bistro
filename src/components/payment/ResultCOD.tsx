import React, { useCallback, useEffect } from "react";
import { useSetAtom } from "jotai";
import { useLocation } from "react-router";
import { Page, useNavigate } from "zmp-ui";
import { CheckTransactionReturns } from "zmp-sdk";

import { ResultPageLocation } from "../../types/payment";
import { clearCartAtom } from "../../state";
import { useCartDrawer } from "../../hooks";
import { IconPaymentFail, IconPaymentSuccess } from "./icons";
import ResultTemplate from "./ResultTemplate";
import CloseResultButton from "./CloseResultButton";

const ResultCOD = ({
  paymentResult,
}: {
  paymentResult: CheckTransactionReturns;
}) => {
  const navigate = useNavigate();
  const { state }: ResultPageLocation = useLocation();
  const { onClose: closeCart } = useCartDrawer();
  const clearCart = useSetAtom(clearCartAtom);
  const isSuccessful = paymentResult.resultCode >= 0;

  const onClose = useCallback(() => {
    navigate(
      { pathname: "/plp", search: state?.redirectSearch },
      { replace: true }
    );
  }, [state?.redirectSearch, navigate]);

  useEffect(() => {
    if (isSuccessful) {
      clearCart();
      closeCart();

      // Card: https://trello.com/c/A0Ecqzdb/17-token-mini-app-khi-thanh-to%C3%A1n-th%C3%A0nh-c%C3%B4ng-call-server
      // sendZaloMessage({
      //   customerId: customer.id,
      //   customerName: customer.name,
      //   tableName: table.name,
      //   quantity: merchantSideOrder.details.length,
      //   totalAmount: merchantSideOrder.totalAmount,
      //   orderId,
      //   orderCode: merchantSideOrder.code,
      //   accessTokenApp: messageToken ?? "",
      // });
    }
  }, [isSuccessful]);

  return (
    <Page className="flex-1 flex flex-col bg-white">
      {isSuccessful ? (
        <>
          <ResultTemplate
            title="Đặt đơn thành công"
            message="Đơn hàng COD của bạn đã được ghi nhận và sẽ được xử lý trong thời gian sớm nhất."
            icon={<IconPaymentSuccess />}
          />
          <CloseResultButton onClose={onClose}>Hoàn tất</CloseResultButton>
        </>
      ) : (
        <>
          <ResultTemplate
            title="Đặt đơn không thành công"
            message="Có lỗi trong quá trình xử lý, vui lòng thử lại hoặc liên hệ quán để được hỗ trợ."
            icon={<IconPaymentFail />}
          />
          <CloseResultButton onClose={onClose}>Đóng</CloseResultButton>
        </>
      )}
    </Page>
  );
};

export default ResultCOD;
