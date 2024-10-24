import { createOrder } from "zmp-sdk";

import { Option, Product } from "../types/product";
import { SelectedOptions } from "../types/cart";
import { getConfig } from "./config";

export function calcFinalPrice(product: Product, options?: SelectedOptions) {
  let finalPrice = product.price;
  if (product.sale) {
    if (product.sale.type === "fixed") {
      finalPrice = product.price - product.sale.amount;
    } else {
      finalPrice = product.price * (1 - product.sale.percent);
    }
  }

  if (options && product.variants) {
    const selectedOptions: Option[] = [];
    for (const variantKey in options) {
      const variant = product.variants.find((v) => v.id === variantKey);
      if (variant) {
        const currentOption = options[variantKey];
        if (typeof currentOption === "string") {
          const selected = variant.options.find((o) => o.id === currentOption);
          if (selected) {
            selectedOptions.push(selected);
          }
        } else {
          const selecteds = variant.options.filter((o) =>
            currentOption.includes(o.id)
          );
          selectedOptions.push(...selecteds);
        }
      }
    }
    finalPrice = selectedOptions.reduce((price, option) => {
      if (option.priceChange) {
        if (option.priceChange.type == "fixed") {
          return price + option.priceChange.amount;
        } else {
          return price + product.price * option.priceChange.percent;
        }
      }
      return price;
    }, finalPrice);
  }
  return finalPrice;
}

export const pay = (amount: number, description?: string) =>
  createOrder({
    desc:
      description ??
      `Thanh toán cho ${getConfig((config) => config.app.title)}`,
    item: [],
    amount: amount,
    success: (data) => {},
    fail: (err) => {},
  });

export const getTestSearchParams = () => {
  const searchParams = new URLSearchParams({
    tableId: "4",
    storeId: "2",
    companyId: "1",
  });

  return searchParams.toString();
};

export const verifyLocationSearch = (search: string): boolean => {
  if (!search) return false;

  const searchParams = new URLSearchParams(search);
  const tableId = searchParams.get("tableId");
  const storeId = searchParams.get("storeId");
  const companyId = searchParams.get("companyId");

  return tableId != null && storeId != null && companyId != null;
};
