import React, { FC, Suspense } from "react";
import { useRecoilValue } from "recoil";
import products from "../../../mock/products.json";
import ProductListSection from "../../components/ProductListSection";
import ProductItem from "../../components/ProductItem";
import { Product } from "../../types/product";
import { ProductItemSkeleton } from "../../components/skeletons";

export const ProductListContent: FC = () => {
  console.log(products);

  return (
    <ProductListSection title="Danh sách sản phẩm">
      <div className="grid grid-cols-2 gap-4">
        {(products as Product[]).map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </ProductListSection>
  );
};

export const ProductListFallback: FC = () => {
  const products = [...new Array(12)];

  return (
    <ProductListSection title="Danh sách sản phẩm">
      <div className="grid grid-cols-2 gap-4">
        {products.map((_, i) => (
          <ProductItemSkeleton key={i} />
        ))}
      </div>
    </ProductListSection>
  );
};

export const ProductList: FC = () => {
  return (
    <Suspense fallback={<ProductListFallback />}>
      <ProductListContent />
    </Suspense>
  );
};

export default ProductList;
