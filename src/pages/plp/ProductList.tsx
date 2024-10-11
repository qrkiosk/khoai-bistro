import React from "react";

import { CategoryWithProducts } from "../../types/product";
import ProductListSection from "../../components/ProductListSection";
import ProductItem from "../../components/ProductItem";

const ProductList = ({ category }: { category: CategoryWithProducts }) => {
  return (
    <ProductListSection title={category.name}>
      <div className="grid grid-cols-2 gap-4">
        {category.products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </ProductListSection>
  );
};

export default ProductList;
