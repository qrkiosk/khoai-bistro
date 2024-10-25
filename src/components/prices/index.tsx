import React, { useMemo } from "react";
import { Box, BoxProps, Text, TextProps } from "@chakra-ui/react";

import { withThousandSeparators } from "../../utils/number";

type Size = "sm" | "md" | "lg";

type ProhibitedStyleProps =
  | "variant"
  | "color"
  | "size"
  | "colorScheme"
  | "textDecoration"
  | "fontWeight"
  | "fontSize";

interface DisplayPriceProps extends Omit<TextProps, ProhibitedStyleProps> {
  children: number | string;
  variant: "standard" | "base" | "sale" | "total" | "unstyled";
  size?: Size;
  prefix?: string;
  suffix?: string;
}

export const DisplayPrice = ({
  children,
  variant,
  size = "sm",
  prefix = "",
  suffix = "",
  ...otherProps
}: DisplayPriceProps) => {
  const variantStyle = useMemo<TextProps>(() => {
    switch (variant) {
      case "base":
        return {
          color: "GrayText",
          textDecoration: "line-through",
        };
      case "sale":
        return {
          color: "InfoText",
          fontWeight: "semibold",
        };
      case "total":
        return {
          color: "InfoText",
          fontWeight: "bold",
        };
      case "standard":
        return {
          color: "InfoText",
          fontWeight: "normal",
        };
      case "unstyled":
      default:
        return {};
    }
  }, [variant]);

  const formatted = useMemo(
    () =>
      typeof children === "number"
        ? withThousandSeparators(children)
        : children,
    [children]
  );

  return (
    <Text {...otherProps} {...variantStyle} fontSize={size}>
      {`${prefix}${formatted}${suffix}`}
    </Text>
  );
};

interface ProductDisplayPricesProps extends Omit<BoxProps, "size"> {
  children: [number, number];
  size?: Size;
  emphasizeSalePrice?: boolean;
}

export const ProductDisplayPrices = ({
  children: [priceBase, priceSale],
  size = "sm",
  emphasizeSalePrice = false,
  ...otherProps
}: ProductDisplayPricesProps) => {
  console.log(priceSale, priceBase);
  return (
    <Box {...otherProps} className="flex items-center space-x-1">
      {priceSale !== priceBase && (
        <DisplayPrice variant="base" size={emphasizeSalePrice ? "sm" : size}>
          {priceBase}
        </DisplayPrice>
      )}
      <DisplayPrice variant="sale" size={size}>
        {priceSale}
      </DisplayPrice>
    </Box>
  );
};
