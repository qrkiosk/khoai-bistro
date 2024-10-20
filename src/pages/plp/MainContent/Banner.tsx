import React, { forwardRef } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { Swiper } from "zmp-ui";

import { CategoryWithProducts } from "../../../types/product";
import ProductItemH from "../../../components/ProductItemH";

const Banner = forwardRef<HTMLDivElement, { category: CategoryWithProducts }>(
  ({ category }, ref) => {
    return (
      <Box bgColor="var(--zmp-background-white)" px={6} py={5}>
        <Box ref={ref} id={category.id} />
        <Heading as="p" size="md" fontWeight={500} mt={1} mb={2}>
          {category.name}
        </Heading>
        <Swiper dots={false}>
          {category.products.map((product) => (
            <Swiper.Slide key={product.id}>
              <ProductItemH product={product} />
            </Swiper.Slide>
          ))}
        </Swiper>
      </Box>
    );
  }
);

export default Banner;
