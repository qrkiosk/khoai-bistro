import axios from "axios";

import { MerchantSideOrder, OAMessageReqData, Order } from "../types/order";
import { Response } from "./types";
import { BASE_URL } from "./constants";

export const createMerchantSideOrder = (order: Order) => {
  return axios.post<
    Response<{ id: string; companyId: number; storeId: number }>
  >(`${BASE_URL}/order/create`, order);
};

export const queryMerchantSideOrder = ({
  orderId,
  companyId,
  storeId,
}: {
  orderId: string;
  companyId: number;
  storeId: number;
}) => {
  return axios.post<Response<MerchantSideOrder>>(
    `${BASE_URL}/order/${orderId}`,
    { companyId, storeId }
  );
};

export const sendZaloMessage = (data: OAMessageReqData) =>
  axios.post(`${BASE_URL}/zalo/app/send-message`, data);
