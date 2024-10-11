import axios from "axios";

import {
  Product,
  ProductWithOptions,
  CategoryWithProducts,
} from "../types/product";
import { Response } from "./types";
import { BASE_URL } from "./constant";

export const getStoreProducts = ({ storeId }: { storeId: number }) => {
  return axios.post<Response<Product[]>>(`${BASE_URL}/product`, {
    filtered: [{ id: "storeId", value: storeId }],
    sorted: [{ id: "seq", asc: true }],
    pageSize: 1000,
    page: 0,
  });
};

export const getStoreProductsByCategory = ({
  storeId,
}: {
  storeId: number;
}) => {
  return axios.post<Response<CategoryWithProducts[]>>(
    `${BASE_URL}/product/category`,
    {
      filtered: [{ id: "storeId", value: storeId }],
      sorted: [{ id: "seq", asc: true }],
      pageSize: 10,
      page: 0,
    }
  );
};

export const getProductById = (id: string) => {
  return axios.get<Response<ProductWithOptions>>(`${BASE_URL}/product/${id}`);
};
