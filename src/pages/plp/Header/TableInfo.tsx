import React, { useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAtomValue } from "jotai";
import { Icon } from "zmp-ui";
import { Box, Text } from "@chakra-ui/react";

import { tableInfoAtom } from "../../../state";

const TableInfo = () => {
  const { data: tableInfo, isLoading } = useAtomValue(tableInfoAtom);
  const tableName = tableInfo?.name;

  const displayTableName = useMemo(() => {
    if (isLoading) return "Đang tải thông tin bàn...";
    if (!tableName) return "Bàn: Ko xác định";
    return `Bàn: ${tableName}`;
  }, [tableName, isLoading]);

  return (
    <Box
      w="100%"
      h="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Icon size={20} icon="zi-location-solid" />
      <Text fontSize={14} ml={2}>
        {displayTableName}
      </Text>
    </Box>
  );
};

const EnhancedTableInfo = () => {
  return (
    <ErrorBoundary
      fallback={
        <Text fontSize={12} fontWeight="light">
          Lỗi: Ko thể lấy thông tin bàn
        </Text>
      }
    >
      <TableInfo />
    </ErrorBoundary>
  );
};

export default EnhancedTableInfo;
