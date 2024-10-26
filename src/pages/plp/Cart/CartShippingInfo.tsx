import React from "react";
import { useAtomValue } from "jotai";
import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/react";

import { tableInfoAtom, userNameAtom } from "../../../state";
import Divider from "../../../components/Divider";

const CartShippingInfo = () => {
  const { data: tableInfo } = useAtomValue(tableInfoAtom);
  const userName = useAtomValue(userNameAtom);

  return (
    <>
      <Box p={4} bgColor="var(--zmp-background-white)">
        <Grid templateColumns="repeat(2, 1fr)">
          <GridItem colSpan={2}>
            <Heading size="sm">Thông tin đơn hàng</Heading>
          </GridItem>

          <GridItem colSpan={1}>
            <Text fontSize="sm" mt={3}>
              Tên khách hàng
            </Text>
          </GridItem>
          <GridItem colSpan={1}>
            <Text fontSize="sm" fontWeight="semibold" textAlign="right" mt={3}>
              {userName || "Guest"}
            </Text>
          </GridItem>

          <GridItem colSpan={1}>
            <Text fontSize="sm" mt={1}>
              Hình thức nhận hàng
            </Text>
          </GridItem>
          <GridItem colSpan={1}>
            <Text fontSize="sm" fontWeight="semibold" textAlign="right" mt={1}>
              {`Tại bàn ${tableInfo?.name || ""}`.trim()}
            </Text>
          </GridItem>
        </Grid>
      </Box>
      <Divider />
    </>
  );
};

export default CartShippingInfo;
