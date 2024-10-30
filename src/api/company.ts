import axios from "axios";

import { Store, Table } from "../types/company";
import { Response } from "./types";
import { BASE_URL } from "./constants";

export const getStoreTableById = (id: number) => {
  return axios.get<Response<Table>>(`${BASE_URL}/company/store/table/${id}`);
};

export const getStoreById = (id: number) => {
  return axios.get<Response<Store>>(`${BASE_URL}/company/store/${id}`);
};
