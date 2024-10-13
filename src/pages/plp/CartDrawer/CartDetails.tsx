import React, { useCallback } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { authorize } from "zmp-sdk";
import isEmpty from "lodash/isEmpty";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";

import {
  cartAtom,
  isEditingCartItemAtom,
  productVariantAtom,
  cartSubtotalAtom,
  removeCartItemAtom,
  tableInfoAtom,
} from "../../../state";
import { DisplayPrice } from "../../../components/prices";
import Divider from "../../../components/Divider";
import { calcItemTotalAmount, genMultiChoiceOptionDisplayText } from "./utils";

const CartDetails = () => {
  const cart = useAtomValue(cartAtom);
  const subtotal = useAtomValue(cartSubtotalAtom);
  const removeCartItem = useSetAtom(removeCartItemAtom);
  const { data: tableInfo } = useAtomValue(tableInfoAtom);
  const setProductVariant = useSetAtom(productVariantAtom);
  const setIsEditingCartItem = useSetAtom(isEditingCartItemAtom);

  const onClickPlaceOrder = useCallback(async () => {
    try {
      const authResult = await authorize({
        scopes: ["scope.userInfo", "scope.userPhonenumber"],
      });
    } catch (error) {}
  }, []);

  return (
    <Box display="flex" flexDirection="column" h="100%">
      <Box bgColor="var(--zmp-background-color)" flexGrow={1}>
        <Box p={4} bgColor="var(--zmp-background-white)">
          <Grid templateColumns="repeat(2, 1fr)">
            <GridItem colSpan={2}>
              <Box h="100%" display="flex" alignItems="center">
                <Heading size="sm">Tóm tắt đơn hàng</Heading>
              </Box>
            </GridItem>

            {cart.items.map((item) => (
              <>
                <GridItem key={`${item.uniqIdentifier}--col1`} colSpan={1}>
                  <Box h="100%" display="flex" mt={5}>
                    <Button
                      colorScheme="blue"
                      variant="outline"
                      size="sm"
                      p={0}
                    >
                      {item.quantity}x
                    </Button>
                    <Box flexGrow={1} ml={1}>
                      <Heading size="xs" pl={2} mb={2}>
                        {item.name}
                      </Heading>
                      <Stack>
                        {item.options.map((opt) => (
                          <>
                            {opt.selectedDetail && (
                              <Text key={opt.id} fontSize="xs" pl={2}>
                                {opt.selectedDetail.name}
                              </Text>
                            )}
                            {!isEmpty(opt.selectedDetails) && (
                              <Text key={opt.id} fontSize="xs" pl={2}>
                                {genMultiChoiceOptionDisplayText(opt)}
                              </Text>
                            )}
                          </>
                        ))}
                      </Stack>
                      <Box mt={2} display="flex" alignItems="flex-start">
                        <Button
                          colorScheme="blue"
                          variant="ghost"
                          size="xs"
                          onClick={() => {
                            setProductVariant(item);
                            setIsEditingCartItem(true);
                          }}
                        >
                          Chỉnh sửa
                        </Button>
                        <Button
                          colorScheme="blue"
                          variant="ghost"
                          size="xs"
                          onClick={() => removeCartItem(item.uniqIdentifier)}
                        >
                          Xóa
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </GridItem>
                <GridItem key={`${item.uniqIdentifier}--col2`} colSpan={1}>
                  <Text fontSize="sm" textAlign="right" mt={5}>
                    <DisplayPrice>{calcItemTotalAmount(item)}</DisplayPrice>
                  </Text>
                </GridItem>
              </>
            ))}

            <GridItem colSpan={1}>
              <Text fontSize="sm" mt={5}>
                Tổng tạm tính
              </Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text fontSize="sm" textAlign="right" mt={5}>
                <DisplayPrice>{subtotal}</DisplayPrice>
              </Text>
            </GridItem>

            <GridItem colSpan={1}>
              <Text fontSize="sm" mt={1}>
                Giảm giá
              </Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text fontSize="sm" textAlign="right" mt={1}>
                <DisplayPrice>{0}</DisplayPrice>
              </Text>
            </GridItem>

            <GridItem colSpan={1}>
              <Text fontSize="sm" mt={1}>
                Tổng thanh toán
              </Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text fontSize="sm" textAlign="right" mt={1}>
                <DisplayPrice>{subtotal}</DisplayPrice>
              </Text>
            </GridItem>
          </Grid>
        </Box>
        <Divider />

        <Box p={4} bgColor="var(--zmp-background-white)">
          <Grid templateColumns="repeat(2, 1fr)">
            <GridItem colSpan={2}>
              <Heading size="sm">Thông tin nhận hàng</Heading>
            </GridItem>

            <GridItem colSpan={1}>
              <Text fontSize="sm" mt={3}>
                Tên người nhận
              </Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text
                fontSize="sm"
                fontWeight="semibold"
                textAlign="right"
                mt={3}
              >
                Khách bàn {tableInfo?.name ?? "Không xác định"}
              </Text>
            </GridItem>

            <GridItem colSpan={1}>
              <Text fontSize="sm" mt={1}>
                Hình thức nhận hàng
              </Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text
                fontSize="sm"
                fontWeight="semibold"
                textAlign="right"
                mt={1}
              >
                Tại cửa hàng
              </Text>
            </GridItem>
          </Grid>
        </Box>
        <Divider />

        <Box p={4} bgColor="var(--zmp-background-white)">
          <Heading size="sm">Phương thức thanh toán</Heading>
          <Box mt={3}>
            <RadioGroup value="ON_SITE">
              <Radio value="ON_SITE">Tại quầy</Radio>
            </RadioGroup>
          </Box>
        </Box>
        <Divider />
      </Box>

      <Box
        position="sticky"
        left={0}
        right={0}
        bottom={0}
        bgColor="var(--zmp-background-white)"
        p={3}
      >
        <Button
          variant="solid"
          autoFocus={false}
          colorScheme="green"
          w="100%"
          textAlign="left"
          size="md"
          onClick={onClickPlaceOrder}
        >
          Xác nhận đặt đơn
        </Button>
      </Box>
    </Box>
  );
};

export default CartDetails;
