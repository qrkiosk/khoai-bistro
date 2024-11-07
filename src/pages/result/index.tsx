import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import {
  AsyncCallbackFailObject,
  CheckTransactionReturns,
  Payment,
} from "zmp-sdk";

import {
  PaymentType,
  State,
  ResultPageLocation,
  PaymentResultCode,
} from "../../types/payment";
import {
  ResultPending,
  ResultGeneralError,
  ResultCOD,
  ResultMOMO,
  ResultBANK,
} from "../../components/payment";

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
  const { state }: ResultPageLocation = useLocation();
  const checkTransAttempts = useRef(0);
  const [paymentResult, setPaymentResult] = useState<
    AsyncCallbackFailObject | CheckTransactionReturns | null
  >(null);

  useEffect(() => {
    if (!state) return;

    const data = getCheckTransData(state);
    if (!data) return;

    let timeout: number;
    const checkStatus = () => {
      Payment.checkTransaction({
        data,
        success: (result) => {
          console.log(result);
          setPaymentResult(result);
          if (
            result.resultCode === PaymentResultCode.PENDING &&
            checkTransAttempts.current < 5
          ) {
            // Transaction still in progress, retry every 2.5s for 5 times
            // After 5 attempts without success, transaction will be considered a failed one
            // TODO: Mark the corresponding merchant-side order as failed if transaction fails
            timeout = setTimeout(checkStatus, 2500);
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

  if (paymentResult == null) return <ResultPending />;

  if ("code" in paymentResult) {
    // This means paymentResult is an AsyncCallbackFailObject, checking the failure
    console.log(paymentResult);
    return <ResultGeneralError />;
  }

  // Here paymentResult is a CheckTransactionReturns
  // Handle the result according to the payment method
  switch (paymentResult.method) {
    case PaymentType.MOMO:
      return <ResultMOMO paymentResult={paymentResult} />;
    case PaymentType.COD:
      return <ResultCOD paymentResult={paymentResult} />;
    case PaymentType.BANK:
      return <ResultBANK paymentResult={paymentResult} />;
    default:
      return null;
  }
};

export default CheckoutResultPage;
