import React, { useCallback } from "react";
import { useSetAtom } from "jotai";
import { Box, Card, IconButton, Image, Text } from "@chakra-ui/react";
import { Icon } from "zmp-ui";

import { Product } from "../types/product";
import { selectedProductIdAtom } from "../state";
import { APP_ACCENT_COLOR } from "../utils/constants";
import { FinalPrice } from "./prices";

const ProductItem = {} as {
  Banner: React.FC<{ product: Product }>;
  Grid: React.FC<{ product: Product }>;
  List: React.FC<{ product: Product }>;
};

ProductItem.Banner = ({ product }: { product: Product }) => {
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
      <Box className="flex-1 flex relative space-x-2">
        <Image
          src={product.url}
          alt="Banner Product Image"
          loading="lazy"
          borderRadius="12px"
          objectFit="cover"
          minW="96px"
          maxW="96px"
        />
        <Box display="flex" flexDir="column">
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

ProductItem.Grid = ({ product }: { product: Product }) => {
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
          alt="Grid Product Image"
          className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover object-center rounded-lg bg-skeleton"
        />
        <IconButton
          icon={<Icon size={14} icon="zi-plus" />}
          isRound={true}
          variant="solid"
          colorScheme={APP_ACCENT_COLOR}
          aria-label="Add"
          size="sm"
          position="absolute"
          right="4px"
          bottom="4px"
          onClick={selectProduct}
        />
      </Box>
      <Text>{product.name}</Text>
      <Text color="InfoText" fontWeight="semibold" fontSize="sm" pb={2}>
        <FinalPrice>{product}</FinalPrice>
      </Text>
    </Box>
  );
};

ProductItem.List = ({ product }: { product: Product }) => {
  const setSelectedProductId = useSetAtom(selectedProductIdAtom);
  const selectProduct = useCallback(() => {
    setSelectedProductId(product.id);
  }, [product.id]);

  return (
    <Card
      direction="row"
      overflow="hidden"
      variant="unstyled"
      onClick={selectProduct}
    >
      <Box className="flex-1 flex relative space-x-2">
        <Image
          src={product.url}
          alt="List Product Image"
          loading="lazy"
          borderRadius="12px"
          objectFit="cover"
          minW="96px"
          maxW="96px"
        />
        <Box display="flex" flexDir="column">
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

export default ProductItem;
