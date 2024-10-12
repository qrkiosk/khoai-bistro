import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAtomValue } from "jotai";
import { Box, Text } from "@chakra-ui/react";
import isEmpty from "lodash/isEmpty";

import { storeProductsByCategoryAtom } from "../../../state";
import { SkeletonContent } from "../../../components/skeletons";
import Divider from "../../../components/Divider";
import Banner from "./Banner";
import ProductList from "./ProductList";

const MainContent = () => {
  const { data: categories, isLoading } = useAtomValue(
    storeProductsByCategoryAtom
  );

  if (isLoading || isEmpty(categories)) return <SkeletonContent />;

  return (
    <Box className="flex-1 overflow-auto">
      {categories.map((category, index) =>
        index === 0 ? (
          <>
            <Banner key={category.id} category={category} />
            <Divider />
          </>
        ) : (
          <>
            <ProductList key={category.id} category={category} />
            <Divider />
          </>
        )
      )}
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
