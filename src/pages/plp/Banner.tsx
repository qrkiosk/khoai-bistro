import React from "react";
import { Swiper } from "zmp-ui";

import { CategoryWithProducts } from "../../types/product";
import ProductListSection from "../../components/ProductListSection";
import ProductItemH from "../../components/ProductItemH";

const Banner = ({ category }: { category: CategoryWithProducts }) => {
  return (
    <ProductListSection title={category.name}>
      <Swiper dots={false}>
        {category.products.map((product) => (
          <Swiper.Slide key={product.id}>
            <ProductItemH product={product} />
          </Swiper.Slide>
        ))}
      </Swiper>
    </ProductListSection>
  );
};

export default Banner;
