import React, { forwardRef } from "react";
import { Box, Heading, Divider as LineDivider } from "@chakra-ui/react";
import useEmblaCarousel from "embla-carousel-react";

import { CategoryWithProducts } from "../types/product";
import ProductItem from "./ProductItem";

type ProductListingProps = {
  category: CategoryWithProducts;
  scrollMargin?: number | undefined;
};

const ProductsListing = {} as {
  Banner: React.ForwardRefExoticComponent<
    ProductListingProps & React.RefAttributes<HTMLDivElement>
  >;
  Grid: React.ForwardRefExoticComponent<
    ProductListingProps & React.RefAttributes<HTMLDivElement>
  >;
  List: React.ForwardRefExoticComponent<
    ProductListingProps & React.RefAttributes<HTMLDivElement>
  >;
};

ProductsListing.Banner = forwardRef<HTMLDivElement, ProductListingProps>(
  ({ category, scrollMargin }, ref) => {
    const [emblaRef] = useEmblaCarousel({ dragFree: true });

    return (
      <Box bgColor="var(--zmp-background-white)" py={5}>
        <Box ref={ref} id={category.id} scrollMarginTop={scrollMargin} />
        <Heading as="p" size="md" fontWeight="semibold" px={6} mt={1} mb={2}>
          {category.name}
        </Heading>
        <Box className="embla">
          <Box className="embla__viewport" ref={emblaRef}>
            <Box className="embla__container">
              {category.products.map((product) => (
                <Box key={product.id} className="embla__slide">
                  <ProductItem.Banner product={product} />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
);

ProductsListing.Grid = forwardRef<HTMLDivElement, ProductListingProps>(
  ({ category, scrollMargin }, ref) => {
    return (
      <Box bgColor="var(--zmp-background-white)" px={6} py={5}>
        <Box ref={ref} id={category.id} scrollMarginTop={scrollMargin} />
        <Heading as="p" size="md" fontWeight="semibold" mt={1} mb={4}>
          {category.name}
        </Heading>
        <Box className="grid grid-cols-2 gap-4">
          {category.products.map((product) => (
            <ProductItem.Grid key={product.id} product={product} />
          ))}
        </Box>
      </Box>
    );
  }
);

ProductsListing.List = forwardRef<HTMLDivElement, ProductListingProps>(
  ({ category, scrollMargin }, ref) => {
    return (
      <Box bgColor="var(--zmp-background-white)" px={6} py={5}>
        <Box ref={ref} id={category.id} scrollMarginTop={scrollMargin} />
        <Heading as="p" size="md" fontWeight="semibold" mt={1} mb={4}>
          {category.name}
        </Heading>
        <Box className="flex flex-col">
          {category.products.map((product, idx) => {
            const isLast = idx === category.products.length - 1;

            return (
              <Box key={product.id}>
                <ProductItem.List product={product} />
                {!isLast && <LineDivider my={4} />}
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }
);

export default ProductsListing;
