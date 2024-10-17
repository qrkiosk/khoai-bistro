import React, { FC, useMemo } from "react";

import { Product } from "../../types/product";
import { SelectedOptions } from "../../types/cart";
import { calcFinalPrice } from "../../utils/product";

const CURRENCY_SYMBOL = "";

export const DisplayPrice: FC<{ children: number }> = ({ children }) => {
  return (
    <>
      {CURRENCY_SYMBOL}
      {children.toLocaleString()}
    </>
  );
};

export const FinalPrice: FC<{
  children: Product;
  options?: SelectedOptions;
}> = ({ children, options }) => {
  const finalPrice = useMemo(
    () => calcFinalPrice(children, options),
    [children, options]
  );

  return <DisplayPrice>{finalPrice}</DisplayPrice>;
};
