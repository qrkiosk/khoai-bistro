import React from "react";
import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

const SkeletonContent = () => (
  <Box padding="6" bg="white">
    <Skeleton height="80px" mb={8} />
    <SkeletonText my={8} noOfLines={3} spacing={3} skeletonHeight={3} />
    <SkeletonText my={8} noOfLines={3} spacing={3} skeletonHeight={3} />
  </Box>
);

export default SkeletonContent;
