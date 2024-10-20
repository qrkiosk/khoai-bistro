import React, { forwardRef } from "react";
import { Box, Heading } from "@chakra-ui/react";

import { CategoryWithProducts } from "../../../types/product";
import ProductItem from "../../../components/ProductItem";

const ProductList = forwardRef<
  HTMLDivElement,
  { category: CategoryWithProducts }
>(({ category }, ref) => {
  return (
    <Box bgColor="var(--zmp-background-white)" px={6} py={5}>
      <Box ref={ref} id={category.id} />
      <Heading as="p" size="md" fontWeight={500} mt={1} mb={2}>
        {category.name}
      </Heading>
      <Box className="grid grid-cols-2 gap-4">
        {category.products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </Box>
    </Box>
  );
});

export default ProductList;
