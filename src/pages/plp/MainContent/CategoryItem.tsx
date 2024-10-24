import React, { useEffect, useRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { Box } from "@chakra-ui/react";

import { categoryIdInViewAtom, setCategoryRefsMapAtom } from "../../../state";
import { CategoryWithProducts } from "../../../types/product";
import Divider from "../../../components/Divider";
import { mainContentRefAtom } from "./localState";
import ProductsListing from "./ProductsListing";

const CategoryItem = ({
  category,
  shouldShowBanner,
}: {
  category: CategoryWithProducts;
  shouldShowBanner: boolean;
}) => {
  const scrollIntoViewRef = useRef<HTMLDivElement>(null);
  const observeIntersectionRef = useRef<HTMLDivElement>(null);
  const setCategoryRefsMap = useSetAtom(setCategoryRefsMapAtom);
  const mainContentRef = useAtomValue(mainContentRefAtom);
  const setCategoryIdInView = useSetAtom(categoryIdInViewAtom);

  useEffect(() => {
    setCategoryRefsMap(category.id, scrollIntoViewRef);
  }, [scrollIntoViewRef]);

  useEffect(() => {
    const categoryElement = observeIntersectionRef.current;
    const mainContentElement = mainContentRef?.current;

    if (categoryElement == null || mainContentElement == null) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setCategoryIdInView(category.id);
      },
      { root: mainContentElement, rootMargin: "0px 0px -100% 0px" }
    );
    observer.observe(categoryElement);
  }, []);

  return (
    <Box key={category.id} ref={observeIntersectionRef}>
      {shouldShowBanner ? (
        <ProductsListing.Banner ref={scrollIntoViewRef} category={category} />
      ) : (
        <ProductsListing.Grid ref={scrollIntoViewRef} category={category} />
      )}
      <Divider />
    </Box>
  );
};

export default CategoryItem;
