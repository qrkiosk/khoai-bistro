import React, { FC } from "react";

const CURRENCY_SYMBOL = "đ";

export const DisplayPrice: FC<{ children: number }> = ({ children }) => {
  return (
    <>
      {CURRENCY_SYMBOL}
      {children.toLocaleString()}
    </>
  );
};
