import React from "react";
import { Box } from "@chakra-ui/react";

import { CategoryWithProducts } from "../../../types/product";
import ProductListSection from "../../../components/ProductListSection";
import ProductItem from "../../../components/ProductItem";

const ProductList = ({ category }: { category: CategoryWithProducts }) => {
  return (
    <ProductListSection title={category.name}>
      <Box className="grid grid-cols-2 gap-4">
        {category.products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </Box>
    </ProductListSection>
  );
};

export default ProductList;
