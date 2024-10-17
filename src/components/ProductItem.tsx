import React, { useCallback } from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { useSetAtom } from "jotai";

import { selectedProductIdAtom } from "../state";
import { Product } from "../types/product";
import { FinalPrice } from "./prices";
import SelectProductButton from "./SelectProductButton";

const ProductItem = ({ product }: { product: Product }) => {
  const setSelectedProductId = useSetAtom(selectedProductIdAtom);
  const selectProduct = useCallback(() => {
    setSelectedProductId(product.id);
  }, [product.id]);

  return (
    <Box className="space-y-2" onClick={selectProduct}>
      <Box className="w-full aspect-square relative">
        <Image
          loading="lazy"
          src={product.url}
          className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover object-center rounded-lg bg-skeleton"
        />
        <SelectProductButton onClick={selectProduct} />
      </Box>
      <Text>{product.name}</Text>
      <Text color="InfoText" fontWeight="semibold" fontSize="sm" pb={2}>
        <FinalPrice>{product}</FinalPrice>
      </Text>
    </Box>
  );
};

export default ProductItem;
