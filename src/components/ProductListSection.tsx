import React, { PropsWithChildren } from "react";
import { FC } from "react";
import { Box, Text } from "zmp-ui";
import { BoxProps } from "zmp-ui/box";

export interface ProductListSectionProps extends BoxProps {
  title: string;
  padding?: "all" | "none" | "title-only";
}

const ProductListSection: FC<PropsWithChildren<ProductListSectionProps>> = ({
  children,
  title,
  padding = "all",
  ...props
}) => {
  return (
    <div
      className={`bg-background ${padding === "all" ? "p-4 space-y-4" : ""} ${
        padding === "title-only" ? "py-4 space-y-4" : ""
      }`}
      {...props}
    >
      <Text.Title className={`${padding === "title-only" ? "px-4" : ""}`}>
        {title}
      </Text.Title>
      {children}
    </div>
  );
};

export default ProductListSection;
