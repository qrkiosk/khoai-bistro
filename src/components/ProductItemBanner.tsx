import React, { useCallback } from "react";
import { useSetAtom } from "jotai";
import { Box, Card, IconButton, Image, Text } from "@chakra-ui/react";
import { Icon } from "zmp-ui";

import { selectedProductIdAtom } from "../state";
import { APP_ACCENT_COLOR } from "../utils/constants";
import { Product } from "../types/product";
import { FinalPrice } from "./prices";

const ProductItemBanner = ({ product }: { product: Product }) => {
  const setSelectedProductId = useSetAtom(selectedProductIdAtom);
  const selectProduct = useCallback(() => {
    setSelectedProductId(product.id);
  }, [product.id]);

  return (
    <Card
      direction="row"
      overflow="hidden"
      variant="unstyled"
      borderRadius="12px"
      boxShadow="0px 0px 4px rgba(0, 0, 0, 0.15)"
      p={2.5}
      onClick={selectProduct}
    >
      <Box display="flex" position="relative" maxWidth="calc(100%)">
        <Image
          src={product.url}
          alt="Horizontal Product Image"
          loading="lazy"
          borderRadius="12px"
          objectFit="cover"
          maxW="96px"
        />
        <Box display="flex" flexDir="column" ml={2}>
          <Box flexGrow={1}>
            <Text>{product.name}</Text>
            <Text color="GrayText" fontSize="xs" className="two-line-ellipsis">
              {product.description}
            </Text>
          </Box>
          <Text color="InfoText" fontWeight="semibold" fontSize="sm" pb={2}>
            <FinalPrice>{product}</FinalPrice>
          </Text>
        </Box>
        <IconButton
          icon={<Icon size={14} icon="zi-plus" />}
          isRound={true}
          variant="solid"
          colorScheme={APP_ACCENT_COLOR}
          aria-label="Add"
          size="sm"
          position="absolute"
          right={0}
          bottom={0}
          onClick={selectProduct}
        />
      </Box>
    </Card>
  );
};

export default ProductItemBanner;
