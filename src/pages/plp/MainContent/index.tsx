import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAtomValue } from "jotai";
import { Box, Text } from "@chakra-ui/react";
import isEmpty from "lodash/isEmpty";

import { storeProductsByCategoryAtom } from "../../../state";
import { SkeletonContent } from "../../../components/skeletons";
import { usePlpMainContentAreaRef } from "./localState";
import CategoryItem from "./CategoryItem";
import SearchResult from "./SearchResult";

const MainContent = () => {
  const ref = usePlpMainContentAreaRef();
  const { data: categories, isLoading: isFetchingCategories } = useAtomValue(
    storeProductsByCategoryAtom
  );

  if (isFetchingCategories || isEmpty(categories)) {
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
      position="relative"
    >
      {categories.map((category, index) => (
        <CategoryItem category={category} shouldShowBanner={index === 0} />
      ))}
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
