import axios from "axios";

import { Store, StoreTable } from "../types/company";
import { Response } from "./types";
import { BASE_URL } from "./constants";

export const getStoreTableById = (id: number) =>
  axios.get<Response<StoreTable>>(`${BASE_URL}/company/store/table/${id}`);

export const getStoreById = (id: number) =>
  axios.get<Response<Store>>(`${BASE_URL}/company/store/${id}`);
