import React, { useEffect, useRef, useState } from "react";
import { useAtomValue } from "jotai";
import { Icon } from "zmp-ui";
import {
  Box,
  Card,
  Heading,
  Text,
  Divider as LineDivider,
} from "@chakra-ui/react";

import { CategoryTemplate } from "../../../types/product";
import {
  isSearchQueryEmptyAtom,
  storeInfoAtom,
  storeProductsByCategoryAtom,
  tableInfoAtom,
  userNameAtom,
} from "../../../state";
import CategoryItem from "./CategoryItem";
import { useIsLoadedTableOrStore } from "../../../hooks";

const MainListHeader = () => {
  const storeInfoCardRef = useRef<HTMLDivElement>(null);
  const [fillerBoxH, setFillerBoxHeight] = useState<string | number>();
  const { data: tableInfo } = useAtomValue(tableInfoAtom);
  const { data: storeInfo } = useAtomValue(storeInfoAtom);
  const userName = useAtomValue(userNameAtom);
  const isDataReady = useIsLoadedTableOrStore();

  useEffect(() => {
    if (storeInfoCardRef.current?.clientHeight) {
      const pb = 8;
      setFillerBoxHeight(0.75 * storeInfoCardRef.current.clientHeight + pb);
    }
  }, [storeInfoCardRef.current?.clientHeight]);

  if (!isDataReady) return null;

  const safeTableInfo = tableInfo!;
  const safeStoreInfo = storeInfo!;

  return (
    <>
      <Box
        className="flex justify-center relative w-full"
        h="33%"
        background="url(https://www.shutterstock.com/image-photo/cup-coffee-beans-sack-on-600nw-1037995396.jpg)"
      >
        <Card
          ref={storeInfoCardRef}
          direction="column"
          borderRadius="xl"
          position="absolute"
          bottom={0}
          width="90%"
          variant="unstyled"
          boxShadow="0px 0px 8px rgba(0, 0, 0, 0.2)"
          transform="translate(0, 75%)"
          p={4}
        >
          <Heading size="md" fontWeight="semibold" mb={2}>
            {safeStoreInfo.name}
          </Heading>

          <Box display="flex" alignItems="flex-start" className="space-x-1">
            <Icon size={20} icon="zi-location" />
            <Text color="GrayText" fontSize="sm">
              {[
                safeStoreInfo.address,
                safeStoreInfo.wardName,
                safeStoreInfo.districtName,
                safeStoreInfo.provinceName,
              ].join(", ")}
            </Text>
          </Box>

          <LineDivider color="lightgrey" my={3} />

          <Box display="flex" alignItems="flex-start" className="space-x-1">
            <Icon size={20} icon="zi-qrline" />
            <Text color="InfoText" fontSize="sm">
              <Text as="span">Bạn {userName || ""} đang ngồi </Text>
              <Text as="span" fontWeight="semibold">
                BÀN {safeTableInfo.name.toUpperCase()}
              </Text>
            </Text>
          </Box>
        </Card>
      </Box>
      <Box w="100%" h={fillerBoxH} bgColor="var(--zmp-background-white)" />
    </>
  );
};

const MainList = () => {
  const isSearchQueryEmpty = useAtomValue(isSearchQueryEmptyAtom);
  const { data: categories } = useAtomValue(storeProductsByCategoryAtom);

  return (
    <Box
      display={isSearchQueryEmpty ? "block" : "none"}
      overflowY="auto"
      h="100%"
    >
      <MainListHeader />
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          template={category.template || CategoryTemplate.LIST}
        />
      ))}
    </Box>
  );
};

export default MainList;
