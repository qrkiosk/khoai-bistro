import React from "react";
import { Swiper } from "zmp-ui";

import ProductListSection from "../../components/ProductListSection";
import ProductItemH from "../../components/ProductItemH";

const Banner = ({ products }) => {
  return (
    <ProductListSection title="Ưu đãi hôm nay">
      <Swiper dots={false}>
        {products.slice(0, 3).map((product) => (
          <Swiper.Slide>
            <ProductItemH product={product} />
          </Swiper.Slide>
        ))}
      </Swiper>
    </ProductListSection>
  );
};

export default Banner;
