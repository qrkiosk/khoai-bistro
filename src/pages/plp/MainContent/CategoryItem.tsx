import React, { useEffect, useRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { Box } from "@chakra-ui/react";

import { categoryIdInViewAtom, setCategoryRefsMapAtom } from "../../../state";
import { CategoryWithProducts } from "../../../types/product";
import Divider from "../../../components/Divider";
import { plpMainContentAreaRefAtom } from "./localState";
import Banner from "./Banner";
import ProductList from "./ProductList";

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
  const plpMainContentAreaRef = useAtomValue(plpMainContentAreaRefAtom);
  const setCategoryIdInView = useSetAtom(categoryIdInViewAtom);

  useEffect(() => {
    setCategoryRefsMap(category.id, scrollIntoViewRef);
  }, [scrollIntoViewRef]);

  useEffect(() => {
    const categoryElement = observeIntersectionRef.current;
    const plpMainContentArea = plpMainContentAreaRef?.current;

    if (categoryElement == null || plpMainContentArea == null) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setCategoryIdInView(category.id);
      },
      { root: plpMainContentArea, rootMargin: "0px 0px -100% 0px" }
    );
    observer.observe(categoryElement);
  }, []);

  return (
    <Box ref={observeIntersectionRef} key={category.id}>
      {shouldShowBanner ? (
        <Banner ref={scrollIntoViewRef} category={category} />
      ) : (
        <ProductList ref={scrollIntoViewRef} category={category} />
      )}
      <Divider />
    </Box>
  );
};

export default CategoryItem;
