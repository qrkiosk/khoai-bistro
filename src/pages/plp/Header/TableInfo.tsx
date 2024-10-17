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
      justifyContent="flex-end"
    >
      {isLoading || tableInfo == null ? (
        <Spinner />
      ) : (
        <>
          <Icon size={20} icon="zi-location-solid" />
          <Text fontSize="sm" fontWeight="normal" ml={1}>
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
        <Box
          w="100%"
          h="100%"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Icon size={20} icon="zi-warning-solid" />
          <Text
            as="span"
            fontSize="sm"
            fontWeight="light"
            lineHeight={1.2}
            ml={1}
          >
            Ko thể lấy
            <br />
            th.tin bàn
          </Text>
        </Box>
      }
    >
      <TableInfo />
    </ErrorBoundary>
  );
};

export default EnhancedTableInfo;
