import React, { FC } from "react";
import { Text } from "@chakra-ui/react";
import { useSetAtom } from "jotai";

import { selectedProductIdAtom } from "../state";
import { Product } from "../types/product";
import { FinalPrice } from "./prices";

const ProductItem: FC<{ product: Product }> = ({ product }) => {
  const setSelectedProductId = useSetAtom(selectedProductIdAtom);

  return (
    <div
      className="space-y-2"
      onClick={() => {
        setSelectedProductId(product.id);
      }}
    >
      <div className="w-full aspect-square relative">
        <img
          loading="lazy"
          src={product.url}
          className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover object-center rounded-lg bg-skeleton"
        />
      </div>
      <Text>{product.name}</Text>
      <Text color="InfoText" fontWeight="semibold" fontSize="sm" pb={2}>
        <FinalPrice>{product}</FinalPrice>
      </Text>
    </div>
  );
};

export default ProductItem;
