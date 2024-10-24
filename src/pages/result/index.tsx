import React, { useEffect, useRef, useState } from "react";
import { useLocation, Location as BaseLocation } from "react-router";
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

interface State {
  path?: string;
  data?: string | Record<string, string>;
  redirectSearch: string;
}

type Location = BaseLocation<State>;

const getCheckTransData = (state: State) => {
  if ("path" in state) {
    return state.path;
  }

  if ("data" in state) {
    return state.data;
  }

  return null;
};

const CheckoutResultPage = () => {
  const navigate = useNavigate();
  const { state }: Location = useLocation();
  const { onClose: closeCart } = useCartDrawer();
  const setCart = useSetAtom(cartAtom);
  const checkTransAttempts = useRef(0);
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(
    null
  );

  useEffect(() => {
    if (!state) return;

    const data = getCheckTransData(state);
    if (!data) return;

    let timeout: number;
    const checkStatus = () => {
      Payment.checkTransaction({
        data,
        success: (data) => {
          setPaymentResult(data);
          if (data.resultCode === 0 && checkTransAttempts.current < 5) {
            // Transaction still in progress, retry every 3s for 5 times
            timeout = setTimeout(checkStatus, 3000);
          }
        },
        fail: setPaymentResult,
      });
      checkTransAttempts.current += 1;
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
            {paymentResult.resultCode === 1 ? "Hoàn tất" : "Đóng"}
          </Button>
        </Box>
      )}
    </Page>
  );
};

export default CheckoutResultPage;
