import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAtomValue } from "jotai";
import { Box, Text } from "@chakra-ui/react";
import isEmpty from "lodash/isEmpty";

import { CategoryTemplate } from "../../../types/product";
import {
  isSearchQueryEmptyAtom,
  storeProductsByCategoryAtom,
} from "../../../state";
import { useDelayedRendering } from "../../../hooks";
import { SkeletonContent } from "../../../components/skeletons";
import { usePlpMainContentAreaRef } from "./localState";
import CategoryItem from "./CategoryItem";
import SearchResult from "./SearchResult";

const MainContent = () => {
  const ref = usePlpMainContentAreaRef();
  const isSearchQueryEmpty = useAtomValue(isSearchQueryEmptyAtom);
  const { data: categories, isLoading: isFetching } = useAtomValue(
    storeProductsByCategoryAtom
  );
  const shouldRender = useDelayedRendering(600);

  if (!shouldRender || isFetching || isEmpty(categories)) {
    return (
      <Box
        className="flex-1 overflow-auto"
        bgColor="var(--zmp-background-white)"
      >
        <SkeletonContent />
      </Box>
    );
  }

  return (
    <Box
      ref={ref}
      className="flex-1 overflow-auto"
      bgColor="var(--zmp-background-color)"
    >
      <Box
        display={isSearchQueryEmpty ? "block" : "none"}
        overflowY="auto"
        h="100%"
      >
        {categories.map((category, index) => {
          const template = (function () {
            switch (index) {
              case 0:
                return CategoryTemplate.BANNER;
              case 1:
                return CategoryTemplate.GRID;
              default:
                return CategoryTemplate.LIST;
            }
          })();

          return (
            <CategoryItem
              key={category.id}
              category={category}
              template={category.template ?? template}
            />
          );
        })}
      </Box>
      <SearchResult />
    </Box>
  );
};

const EnhancedMainContent = () => {
  return (
    <ErrorBoundary
      fallback={
        <Text as="p" textAlign="center" fontSize="sm" p={4}>
          Lỗi: Không thể tải sản phẩm
        </Text>
      }
    >
      <MainContent />
    </ErrorBoundary>
  );
};

export default EnhancedMainContent;
