import axios from "axios";

import {
  Product,
  ProductWithOptions,
  CategoryWithProducts,
} from "../types/product";
import { Response } from "./types";
import { BASE_URL } from "./constants";

export const getStoreProducts = ({
  storeId,
  companyId,
}: {
  storeId: number;
  companyId: number;
}) => {
  return axios.post<Response<Product[]>>(`${BASE_URL}/product`, {
    filtered: [
      { id: "storeId", value: storeId },
      { id: "companyId", value: companyId },
    ],
    sorted: [{ id: "seq", asc: true }],
    pageSize: 1000,
    page: 0,
  });
};

export const getStoreProductsByCategory = ({
  storeId,
  companyId,
  name,
}: {
  storeId: number;
  companyId: number;
  name?: string;
}) => {
  return axios.post<Response<CategoryWithProducts[]>>(
    `${BASE_URL}/product/category`,
    {
      filtered: [
        { id: "storeId", value: storeId },
        { id: "companyId", value: companyId },
        { id: "name", value: name ?? "" },
      ],
      sorted: [{ id: "seq", asc: true }],
      pageSize: 10,
      page: 0,
    }
  );
};

export const getProductById = (id: string) => {
  return axios.get<Response<ProductWithOptions>>(`${BASE_URL}/product/${id}`);
};
