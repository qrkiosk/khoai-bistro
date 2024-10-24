import React, { FC, useMemo } from "react";

import { Product } from "../../types/product";
import { SelectedOptions } from "../../types/cart";
import { calcFinalPrice } from "../../utils/product";
import { withThousandSeparators } from "../../utils/number";

export const DisplayPrice: FC<{ children: number | string }> = ({
  children,
}) => {
  if (typeof children === "string") return children;
  return withThousandSeparators(children);
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
