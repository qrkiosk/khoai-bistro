import React, { useEffect, useRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { Box } from "@chakra-ui/react";

import {
  categoryIdInViewAtom,
  headerRefAtom,
  mainContentRefAtom,
  setCategoryRefsMapAtom,
} from "../../../state";
import { CategoryTemplate, CategoryWithProducts } from "../../../types/product";
import Divider from "../../../components/Divider";
import ProductsListing from "../../../components/ProductsListing";

const CategoryItem = ({
  category,
  template,
}: {
  category: CategoryWithProducts;
  template: CategoryTemplate;
}) => {
  const scrollIntoViewRef = useRef<HTMLDivElement>(null);
  const observeIntersectionRef = useRef<HTMLDivElement>(null);
  const setCategoryRefsMap = useSetAtom(setCategoryRefsMapAtom);
  const mainContentRef = useAtomValue(mainContentRefAtom);
  const headerRef = useAtomValue(headerRefAtom);
  const setCategoryIdInView = useSetAtom(categoryIdInViewAtom);

  useEffect(() => {
    setCategoryRefsMap(category.id, scrollIntoViewRef);
  }, [scrollIntoViewRef]);

  useEffect(() => {
    const categoryElement = observeIntersectionRef.current;
    const mainContentElement = mainContentRef?.current;
    const headerElement = headerRef?.current;

    if (!categoryElement || !mainContentElement || !headerElement) {
      return;
    }

    const mainContentH = mainContentElement.clientHeight;
    const headerH = headerElement.clientHeight;

    if (!mainContentH || !headerH) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCategoryIdInView(category.id);
        }
      },
      {
        root: mainContentElement,
        rootMargin: `-${headerH}px 0px -${mainContentH - headerH}px 0px`,
      }
    );

    observer.observe(categoryElement);
  }, [mainContentRef?.current?.clientHeight, headerRef?.current?.clientHeight]);

  return (
    <Box ref={observeIntersectionRef}>
      {template === CategoryTemplate.BANNER && (
        <ProductsListing.Banner
          ref={scrollIntoViewRef}
          category={category}
          scrollMargin={headerRef?.current?.clientHeight}
        />
      )}
      {template === CategoryTemplate.GRID && (
        <ProductsListing.Grid
          ref={scrollIntoViewRef}
          category={category}
          scrollMargin={headerRef?.current?.clientHeight}
        />
      )}
      {template === CategoryTemplate.LIST && (
        <ProductsListing.List
          ref={scrollIntoViewRef}
          category={category}
          scrollMargin={headerRef?.current?.clientHeight}
        />
      )}
      <Divider />
    </Box>
  );
};

export default CategoryItem;
