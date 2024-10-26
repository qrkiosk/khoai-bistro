import React from "react";
import { useAtomValue } from "jotai";
import { Box, Heading, SkeletonText } from "@chakra-ui/react";

import { storeInfoAtom } from "../../../state";
import CloseCartButton from "./CloseCartButton";

const CartHeader = () => {
  const { data: storeInfo } = useAtomValue(storeInfoAtom);

  return (
    <Box
      className="safe-area-top sticky top-0 left-0 right-0"
      bgColor="var(--zmp-background-white)"
      boxShadow="0px 1px 4px rgba(0, 0, 0, 0.1)"
      zIndex={9999}
    >
      <Box className="px-3 py-2 flex items-center">
        <CloseCartButton />
        <SkeletonText
          noOfLines={1}
          skeletonHeight="2"
          w="50%"
          flexGrow={1}
          textAlign="center"
          mr={10}
          isLoaded={!!storeInfo?.name}
        >
          <Heading size="sm">{storeInfo?.name}</Heading>
        </SkeletonText>
      </Box>
    </Box>
  );
};

export default CartHeader;
