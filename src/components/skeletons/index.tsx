import React from "react";
import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

export const SkeletonContent = () => (
  <Box className="py-14 px-8" bgColor="var(--zmp-background-white)">
    <Skeleton h="80px" mb={8} />
    <SkeletonText my={8} noOfLines={3} spacing={3} skeletonHeight={3} />
    <SkeletonText my={8} noOfLines={3} spacing={3} skeletonHeight={3} />
  </Box>
);
