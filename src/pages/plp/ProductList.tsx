import React from "react";

import ProductListSection from "../../components/ProductListSection";
import ProductItem from "../../components/ProductItem";
import { Product } from "../../types/product";

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <ProductListSection title="Danh sách sản phẩm">
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </ProductListSection>
  );
};

export default ProductList;
