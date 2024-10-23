import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAtomValue } from "jotai";
import { Icon } from "zmp-ui";
import { Box, Spinner, Text } from "@chakra-ui/react";

import { storeInfoAtom, tableInfoAtom } from "../../../state";

const TableInfo = () => {
  const { data: tableInfo, isLoading: isFetchingTable } =
    useAtomValue(tableInfoAtom);

  const { data: storeInfo, isLoading: isFetchingStore } =
    useAtomValue(storeInfoAtom);

  const isLoading =
    isFetchingTable ||
    tableInfo == null ||
    isFetchingStore ||
    storeInfo == null;

  if (isLoading) return <Spinner size="sm" />;

  return (
    <Text fontSize="sm" fontWeight="normal" whiteSpace="wrap" lineHeight={1.3}>
      {`${storeInfo.name} – Bàn ${tableInfo.name}`}
    </Text>
  );
};

const EnhancedTableInfo = () => {
  return (
    <ErrorBoundary
      fallback={
        <Box w="100%" h="100%" display="flex" alignItems="center">
          <Icon size={18} icon="zi-warning" />
          <Text fontSize="sm" fontWeight="normal" ml={1}>
            Ko thể lấy th.tin bàn
          </Text>
        </Box>
      }
    >
      <TableInfo />
    </ErrorBoundary>
  );
};

export default EnhancedTableInfo;
