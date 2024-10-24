import React, { forwardRef } from "react";
import { Box, Heading } from "@chakra-ui/react";
import useEmblaCarousel from "embla-carousel-react";

import { CategoryWithProducts } from "../../../types/product";
import ProductItemBanner from "../../../components/ProductItemBanner";

const Banner = forwardRef<HTMLDivElement, { category: CategoryWithProducts }>(
  ({ category }, ref) => {
    const [emblaRef] = useEmblaCarousel({ dragFree: true });

    return (
      <Box bgColor="var(--zmp-background-white)" px={6} py={5}>
        <Box ref={ref} id={category.id} />
        <Heading as="p" size="md" fontWeight={500} mt={1} mb={3}>
          {category.name}
        </Heading>
        <Box className="embla">
          <Box className="embla__viewport" ref={emblaRef}>
            <Box className="embla__container">
              {category.products.map((product) => (
                <Box className="embla__slide" key={product.id}>
                  <ProductItemBanner product={product} />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
);

export default Banner;
