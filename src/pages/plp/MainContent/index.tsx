import React, { useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAtomValue, useSetAtom } from "jotai";
import { Box, Text } from "@chakra-ui/react";
import isEmpty from "lodash/isEmpty";

import {
  mainContentRefAtom,
  storeProductsByCategoryAtom,
} from "../../../state";
import { useDelayedRender } from "../../../hooks";
import { SkeletonContent } from "../../../components/skeletons";
import MainList from "./MainList";
import SearchResult from "./SearchResult";

const MainContent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const setMainContentRef = useSetAtom(mainContentRefAtom);
  useEffect(() => {
    setMainContentRef(ref);
  }, [ref]);

  const { data: categories, isLoading: isFetching } = useAtomValue(
    storeProductsByCategoryAtom
  );
  const shouldRender = useDelayedRender(600);

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
      <MainList />
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
