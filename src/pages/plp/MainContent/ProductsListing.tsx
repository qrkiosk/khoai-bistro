import React, { forwardRef } from "react";
import { Box, Heading, Divider as LineDivider } from "@chakra-ui/react";
import useEmblaCarousel from "embla-carousel-react";

import { CategoryWithProducts } from "../../../types/product";
import ProductItem from "../../../components/ProductItem";

const ProductsListing = {} as {
  Banner: React.ForwardRefExoticComponent<
    {
      category: CategoryWithProducts;
    } & React.RefAttributes<HTMLDivElement>
  >;
  Grid: React.ForwardRefExoticComponent<
    {
      category: CategoryWithProducts;
    } & React.RefAttributes<HTMLDivElement>
  >;
  List: React.ForwardRefExoticComponent<
    {
      category: CategoryWithProducts;
    } & React.RefAttributes<HTMLDivElement>
  >;
};

ProductsListing.Banner = forwardRef<
  HTMLDivElement,
  { category: CategoryWithProducts }
>(({ category }, ref) => {
  const [emblaRef] = useEmblaCarousel({ dragFree: true });

  return (
    <Box bgColor="var(--zmp-background-white)" px={6} py={5}>
      <Box ref={ref} id={category.id} />
      <Heading as="p" size="md" fontWeight={500} mt={1} mb={4}>
        {category.name}
      </Heading>
      <Box className="embla">
        <Box className="embla__viewport" ref={emblaRef}>
          <Box className="embla__container">
            {category.products.map((product) => (
              <Box className="embla__slide" key={product.id}>
                <ProductItem.Banner product={product} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

ProductsListing.Grid = forwardRef<
  HTMLDivElement,
  { category: CategoryWithProducts }
>(({ category }, ref) => {
  return (
    <Box bgColor="var(--zmp-background-white)" px={6} py={5}>
      <Box ref={ref} id={category.id} />
      <Heading as="p" size="md" fontWeight={500} mt={1} mb={4}>
        {category.name}
      </Heading>
      <Box className="grid grid-cols-2 gap-4">
        {category.products.map((product) => (
          <ProductItem.Grid key={product.id} product={product} />
        ))}
      </Box>
    </Box>
  );
});

ProductsListing.List = forwardRef<
  HTMLDivElement,
  { category: CategoryWithProducts }
>(({ category }, ref) => {
  return (
    <Box bgColor="var(--zmp-background-white)" px={6} py={5}>
      <Box ref={ref} id={category.id} />
      <Heading as="p" size="md" fontWeight={500} mt={1} mb={4}>
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
});

export default ProductsListing;
