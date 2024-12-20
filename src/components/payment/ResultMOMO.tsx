import React, { useCallback, useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { useLocation } from "react-router";
import { Page, useNavigate } from "zmp-ui";
import { CheckTransactionReturns } from "zmp-sdk";

import { PaymentResultCode, ResultPageLocation } from "../../types/payment";
import { sendZaloMessage } from "../../api/order";
import { clearCartAtom, postCheckoutDataAtom } from "../../state";
import { useCartDrawer } from "../../hooks";
import { IconPaymentFail, IconPaymentSuccess } from "./icons";
import ResultTemplate from "./ResultTemplate";
import CloseResultButton from "./CloseResultButton";

const ResultMOMO = ({
  paymentResult,
}: {
  paymentResult: CheckTransactionReturns;
}) => {
  const navigate = useNavigate();
  const { state }: ResultPageLocation = useLocation();
  const { onClose: closeCart } = useCartDrawer();
  const clearCart = useSetAtom(clearCartAtom);
  const postCheckoutData = useAtomValue(postCheckoutDataAtom);
  const isSuccessful = paymentResult.resultCode === PaymentResultCode.SUCCESS;

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

      if (postCheckoutData != null) sendZaloMessage(postCheckoutData);
    }
  }, [isSuccessful]);

  return (
    <Page className="flex-1 flex flex-col bg-white">
      {isSuccessful ? (
        <>
          <ResultTemplate
            title="Thanh toán thành công"
            message="Đơn hàng của bạn đã được thanh toán qua ví MoMo và sẽ được xử lý trong thời gian sớm nhất."
            icon={<IconPaymentSuccess />}
          />
          <CloseResultButton onClose={onClose}>Hoàn tất</CloseResultButton>
        </>
      ) : (
        <>
          <ResultTemplate
            title="Thanh toán không thành công"
            message="Có lỗi trong quá trình xử lý, vui lòng thử lại hoặc liên hệ quán để được hỗ trợ."
            icon={<IconPaymentFail />}
          />
          <CloseResultButton onClose={onClose}>Đóng</CloseResultButton>
        </>
      )}
    </Page>
  );
};

export default ResultMOMO;
