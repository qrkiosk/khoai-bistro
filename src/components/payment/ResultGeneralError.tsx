import React, { useCallback } from "react";
import { useLocation } from "react-router";
import { Page, useNavigate } from "zmp-ui";

import { ResultPageLocation } from "../../types/payment";
import { IconPaymentFail } from "./icons";
import ResultTemplate from "./ResultTemplate";
import CloseResultButton from "./CloseResultButton";

const ResultGeneralError = ({ message }: { message?: string }) => {
  const navigate = useNavigate();
  const { state }: ResultPageLocation = useLocation();

  const onClose = useCallback(() => {
    navigate(
      { pathname: "/plp", search: state?.redirectSearch },
      { replace: true }
    );
  }, [state?.redirectSearch, navigate]);

  return (
    <Page className="flex-1 flex flex-col bg-white">
      <ResultTemplate
        title="Đặt đơn không thành công"
        message={
          message ||
          "Có lỗi trong quá trình xử lý đơn hàng hoặc thanh toán, vui lòng thử lại hoặc liên hệ quán để được hỗ trợ."
        }
        icon={<IconPaymentFail />}
      />
      <CloseResultButton onClose={onClose}>Đóng</CloseResultButton>
    </Page>
  );
};

export default ResultGeneralError;
