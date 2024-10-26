import React from "react";
import { Page } from "zmp-ui";

import { IconPaymentLoading } from "./icons";
import ResultTemplate from "./ResultTemplate";

const ResultPending = () => {
  return (
    <Page className="flex-1 flex flex-col bg-white">
      <ResultTemplate
        message="Hệ thống đang xử lý, quý khách vui lòng chờ trong giây lát..."
        icon={<IconPaymentLoading />}
      />
    </Page>
  );
};

export default ResultPending;
