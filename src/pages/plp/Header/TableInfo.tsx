import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAtomValue } from "jotai";
import { Icon } from "zmp-ui";
import { Box, Spinner, Text } from "@chakra-ui/react";

import { tableInfoAtom } from "../../../state";

const TableInfo = () => {
  const { data: tableInfo, isLoading } = useAtomValue(tableInfoAtom);
  return (
    <Box
      w="100%"
      h="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {isLoading || tableInfo == null ? (
        <Spinner />
      ) : (
        <>
          <Icon size={20} icon="zi-location-solid" />
          <Text fontSize="sm" ml={2}>
            {`Bàn: ${tableInfo.name}`}
          </Text>
        </>
      )}
    </Box>
  );
};

const EnhancedTableInfo = () => {
  return (
    <ErrorBoundary
      fallback={
        <Text fontSize="xs" fontWeight="light">
          Lỗi: Ko thể lấy thông tin bàn
        </Text>
      }
    >
      <TableInfo />
    </ErrorBoundary>
  );
};

export default EnhancedTableInfo;
