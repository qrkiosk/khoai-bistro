import React from "react";
import { Header as ZHeader, Icon } from "zmp-ui";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";

import logo from "../../../static/icons/logo.png";
import TableInfo from "./TableInfo";

const Header = ({ onOpen }: { onOpen: () => void }) => {
  const showCategoriesRow = false;

  return (
    <ZHeader
      style={{ position: "sticky", height: "auto", padding: "8px 12px" }}
      showBackIcon={false}
      title={
        (
          <Grid
            templateRows={`repeat(${showCategoriesRow ? 3 : 2}, 1fr)`}
            templateColumns="repeat(2, 1fr)"
            rowGap={2}
          >
            <GridItem colSpan={1}>
              <Box display="flex" alignItems="center" className="space-x-2">
                <img className="w-8 h-8 rounded-lg border-inset" src={logo} />
                <Box>
                  <Heading size="xs">Khoai Bistro</Heading>
                  <Text fontSize="xs">Xin chào quý khách!</Text>
                </Box>
              </Box>
            </GridItem>
            <GridItem colSpan={1}>
              <TableInfo />
            </GridItem>
            <GridItem colSpan={2}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <ButtonGroup size="sm" isAttached variant="outline">
                  <Button>Gọi nhân viên</Button>
                  <Button>Gọi thanh toán</Button>
                  <Button variant="solid" colorScheme="green">
                    Nhắn tin Zalo
                  </Button>
                </ButtonGroup>
              </Box>
            </GridItem>
            {showCategoriesRow && (
              <GridItem colSpan={2}>
                <Box
                  display="flex"
                  alignItems="center"
                  pt={1}
                  className="space-x-2"
                >
                  <Box display="flex" flexGrow={1}>
                    <Button
                      variant="outline"
                      size="sm"
                      style={{
                        width: "100%",
                        padding: "0 8px",
                        justifyContent: "space-between",
                      }}
                      rightIcon={<Icon size={20} icon="zi-chevron-down" />}
                      onClick={onOpen}
                    >
                      Tất cả danh mục
                    </Button>
                  </Box>
                  <Button variant="outline" size="sm">
                    Tìm
                  </Button>
                </Box>
              </GridItem>
            )}
          </Grid>
        ) as unknown as string
      }
    />
  );
};

export default Header;
