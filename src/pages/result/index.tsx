import React, { useEffect, useState } from "react";
import { useLocation, Location } from "react-router";
import { useSetAtom } from "jotai";
import { RESET } from "jotai/utils";
import { Payment } from "zmp-sdk";
import { Page, useNavigate } from "zmp-ui";
import { Box, Button } from "@chakra-ui/react";

import { PaymentResult } from "../../types/order";
import { useCartDrawer } from "../../hooks";
import { APP_ACCENT_COLOR } from "../../utils/constants";
import { cartAtom } from "../../state";
import ResultAnnouncement from "./ResultAnnouncement";

type LocationType = Location<{
  path?: string;
  data?: unknown;
  redirectSearch: string;
}>;

const CheckoutResultPage = () => {
  const navigate = useNavigate();
  const { state }: LocationType = useLocation();
  const { onClose: closeCart } = useCartDrawer();
  const setCart = useSetAtom(cartAtom);
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(
    null
  );

  useEffect(() => {
    let timeout: number;

    const checkStatus = () => {
      if (!state) return;

      let data;
      if ("path" in state) {
        data = state.path;
      } else if ("data" in state) {
        data = state.data;
      }

      Payment.checkTransaction({
        data,
        success: (res) => {
          if (res.resultCode === 0) {
            timeout = setTimeout(checkStatus, 3000); // Payment still in progress, retry after 3s
          }
          setPaymentResult(res);
        },
        fail: setPaymentResult,
      });
    };
    checkStatus();

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (paymentResult?.resultCode === 1) {
      closeCart();
      setCart(RESET);
    }
  }, [paymentResult]);

  return (
    <Page className="flex-1 flex flex-col bg-white">
      <ResultAnnouncement data={paymentResult} />
      {paymentResult && (
        <Box p={4}>
          <Button
            variant="solid"
            autoFocus={false}
            colorScheme={APP_ACCENT_COLOR}
            size="md"
            w="100%"
            onClick={() => {
              navigate(
                { pathname: "/plp", search: state.redirectSearch },
                { replace: true }
              );
            }}
          >
            {paymentResult.resultCode === 1 ? "Hoàn tất" : "Thử lại"}
          </Button>
        </Box>
      )}
    </Page>
  );
};

export default CheckoutResultPage;
