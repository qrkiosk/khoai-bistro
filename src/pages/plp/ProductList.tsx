import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";

import sampleProducts from "../../../mock/products.json";
import ProductListSection from "../../components/ProductListSection";
import ProductItem from "../../components/ProductItem";
import { Product } from "../../types/product";
import { ProductItemSkeleton } from "../../components/skeletons";

const PRODUCTS_API_URL = "https://api.example.com/products";

export const ProductListContent = ({ products }: { products: Product[] }) => {
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

export const ProductListFallback = ({ products }: { products: Product[] }) => {
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

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // axios.get(PRODUCTS_API_URL).then((response) => {
    //  setProducts(response.data as Product[]);
    // });
    setProducts(sampleProducts.slice(0, 6) as Product[]);
  }, []);

  return (
    <Suspense fallback={<ProductListFallback products={products} />}>
      <ProductListContent products={products} />
    </Suspense>
  );
};

export default ProductList;
