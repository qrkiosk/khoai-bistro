import axios from "axios";

import { MerchantSideOrder, PostCheckoutData, Order } from "../types/order";
import { Response } from "./types";
import { BASE_URL } from "./constants";

export const createMerchantSideOrder = (order: Order) => {
  return axios.post<
    Response<{ id: string; companyId: number; storeId: number }>
  >(`${BASE_URL}/customer-order/create`, order);
};

export const queryMerchantSideOrder = (orderId: string) => {
  return axios.get<Response<MerchantSideOrder>>(`${BASE_URL}/order/${orderId}`);
};

export const cancelMerchantSideOrder = (data: {
  id: string;
  reason: string;
}) => {
  return axios.put<Response<unknown>>(
    `${BASE_URL}/customer-order/delete`,
    data
  );
};

export const sendZaloMessage = (data: PostCheckoutData) =>
  axios.post(`${BASE_URL}/zalo/app/send-message`, data);
