import React, { useCallback } from "react";
import { Box, Card, Image, Text } from "@chakra-ui/react";
import { useSetAtom } from "jotai";

import { selectedProductIdAtom } from "../state";
import { Product } from "../types/product";
import { FinalPrice } from "./prices";
import SelectProductButton from "./SelectProductButton";

const ProductItemH = ({ product }: { product: Product }) => {
  const setSelectedProductId = useSetAtom(selectedProductIdAtom);
  const selectProduct = useCallback(() => {
    setSelectedProductId(product.id);
  }, [product.id]);

  return (
    <Card
      direction="row"
      overflow="hidden"
      variant="elevated"
      onClick={selectProduct}
    >
      <Box display="flex" position="relative" w="100%">
        <Image
          src={product.url}
          alt="Horizontal Product Image"
          loading="lazy"
          borderRadius="12px"
          objectFit="cover"
          maxW="100px"
        />
        <Box display="flex" flexDir="column" ml={2} w="calc(67%)">
          <Box flexGrow={1}>
            <Text>{product.name}</Text>
            <Box overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
              <Text as="span" color="GrayText" fontSize="xs">
                {product.description}
              </Text>
            </Box>
          </Box>
          <Box>
            <Text color="InfoText" fontWeight="semibold" fontSize="sm" pb={2}>
              <FinalPrice>{product}</FinalPrice>
            </Text>
          </Box>
        </Box>
        <SelectProductButton onClick={selectProduct} />
      </Box>
    </Card>
  );
};

export default ProductItemH;
