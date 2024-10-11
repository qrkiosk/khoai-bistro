import React from "react";
import { Box, Card, Image, Text } from "@chakra-ui/react";
import { useSetAtom } from "jotai";

import { selectedProductIdAtom } from "../state";
import { Product } from "../types/product";
import { FinalPrice } from "./display/final-price";

const ProductItemH = ({ product }: { product: Product }) => {
  const setSelectedProductId = useSetAtom(selectedProductIdAtom);

  return (
    <Card
      direction="row"
      overflow="hidden"
      variant="elevated"
      onClick={() => {
        setSelectedProductId(product.id);
      }}
    >
      <Image
        src={product.url}
        alt="Caramel Latte"
        loading="lazy"
        objectFit="cover"
        maxW="100px"
      />
      <Box display="flex" flexDirection="column" ml={2}>
        <Box flexGrow={1}>
          <Text>{product.name}</Text>
          <Text
            color="GrayText"
            fontSize="xs"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            {product.description}
          </Text>
        </Box>
        <Box>
          <Text color="InfoText" fontWeight="semibold" fontSize="sm" pb={2}>
            <FinalPrice>{product}</FinalPrice>
          </Text>
        </Box>
      </Box>
    </Card>
  );
};

export default ProductItemH;
