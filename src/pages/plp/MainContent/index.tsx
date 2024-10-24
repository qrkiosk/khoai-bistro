import React, { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useLocation } from "react-router";
import { useAtomValue } from "jotai";
import { Box, Text, useBoolean } from "@chakra-ui/react";
import isEmpty from "lodash/isEmpty";

import {
  isSearchQueryEmptyAtom,
  storeProductsByCategoryAtom,
} from "../../../state";
import { delay } from "../../../utils";
import { SkeletonContent } from "../../../components/skeletons";
import { usePlpMainContentAreaRef } from "./localState";
import CategoryItem from "./CategoryItem";
import SearchResult from "./SearchResult";

const useRenderFromCOResult = () => {
  const [isLoading, { on, off }] = useBoolean(false);
  const { search } = useLocation();

  useEffect(() => {
    const isRedirectedFromCOResult =
      new URLSearchParams(search).get("checkoutRedirect") === "true";

    if (isRedirectedFromCOResult) {
      on();
      delay(600).then(off);
    }
  }, [search]);

  return isLoading;
};

const MainContent = () => {
  const ref = usePlpMainContentAreaRef();
  const isSearchQueryEmpty = useAtomValue(isSearchQueryEmptyAtom);
  const { data: categories, isLoading: isFetching } = useAtomValue(
    storeProductsByCategoryAtom
  );
  const isLoading = useRenderFromCOResult();

  if (isLoading || isFetching || isEmpty(categories)) {
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
        {categories.map((category, index) => (
          <CategoryItem
            key={category.id}
            category={category}
            shouldShowBanner={index === 0}
          />
        ))}
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
