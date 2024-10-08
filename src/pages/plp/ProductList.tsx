import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";

import sampleProducts from "../../../mock/products.json";
import ProductListSection from "../../components/ProductListSection";
import ProductItem from "../../components/ProductItem";
import { Product } from "../../types/product";
import { ProductItemSkeleton } from "../../components/skeletons";

// to delete this mock api, call this endpoint: https://designer.mocky.io/manage/delete/1f094713-6105-488d-a5b4-e699912ce8ff/<github_password>
const PRODUCTS_API_URL =
  "https://run.mocky.io/v3/1f094713-6105-488d-a5b4-e699912ce8ff";

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
    axios.get(PRODUCTS_API_URL).then((response) => {
      setProducts(response.data as Product[]);
    });
  }, []);

  return (
    <Suspense fallback={<ProductListFallback products={products} />}>
      <ProductListContent products={products} />
    </Suspense>
  );
};

export default ProductList;
