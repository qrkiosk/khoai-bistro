import React, { useCallback } from "react";
import { useAtomValue, useSetAtom } from "jotai";
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
  userNameAtom,
} from "../../../state";
import { DisplayPrice } from "../../../components/prices";
import Divider from "../../../components/Divider";
import { calcItemTotalAmount, genMultiChoiceOptionDisplayText } from "./utils";
import { useCartDrawer } from "./localState";

const CartDetails = () => {
  const { onClose } = useCartDrawer();
  const cart = useAtomValue(cartAtom);
  const subtotal = useAtomValue(cartSubtotalAtom);
  const removeCartItem = useSetAtom(removeCartItemAtom);
  const { data: tableInfo } = useAtomValue(tableInfoAtom);
  const userName = useAtomValue(userNameAtom);
  const setProductVariant = useSetAtom(productVariantAtom);
  const setIsEditingCartItem = useSetAtom(isEditingCartItemAtom);

  const onClickPlaceOrder = useCallback(async () => {}, []);

  return (
    <Box display="flex" flexDir="column" h="100%">
      <Box bgColor="var(--zmp-background-color)" flexGrow={1}>
        <Box p={4} bgColor="var(--zmp-background-white)">
          <Grid templateColumns="repeat(3, 1fr)">
            <GridItem colSpan={2}>
              <Box h="100%" display="flex" alignItems="center">
                <Heading size="sm">Tóm tắt đơn hàng</Heading>
              </Box>
            </GridItem>
            <GridItem colSpan={1}>
              <Box
                h="100%"
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
              >
                <Button
                  p={0}
                  colorScheme="blue"
                  variant="ghost"
                  size="xs"
                  onClick={onClose}
                >
                  Thêm món
                </Button>
              </Box>
            </GridItem>

            {cart.items.map((item) => {
              const onClickEditItem = () => {
                setProductVariant(item);
                setIsEditingCartItem(true);
              };
              const onClickRemoveItem = () =>
                removeCartItem(item.uniqIdentifier);

              return (
                <>
                  <GridItem key={`${item.uniqIdentifier}--col1`} colSpan={2}>
                    <Box h="100%" display="flex" mt={5}>
                      <Box onClick={onClickEditItem}>
                        <Button
                          colorScheme="blue"
                          variant="outline"
                          size="sm"
                          p={0}
                        >
                          {item.quantity}x
                        </Button>
                      </Box>
                      <Box>
                        <Box flexGrow={1} ml={2} onClick={onClickEditItem}>
                          <Heading size="xs" mb={1}>
                            {item.name}
                          </Heading>
                          <Stack rowGap={1}>
                            {item.options.map((opt) => (
                              <>
                                {opt.selectedDetail && (
                                  <Text key={opt.id} fontSize="sm">
                                    {opt.selectedDetail.name}
                                  </Text>
                                )}
                                {!isEmpty(opt.selectedDetails) && (
                                  <Text key={opt.id} fontSize="sm">
                                    {genMultiChoiceOptionDisplayText(opt)}
                                  </Text>
                                )}
                              </>
                            ))}
                            {item.note && (
                              <Text fontSize="xs" color="GrayText">
                                {item.note}
                              </Text>
                            )}
                          </Stack>
                        </Box>
                        <Box mt={2} display="flex" alignItems="flex-start">
                          <Button
                            colorScheme="blue"
                            variant="ghost"
                            size="xs"
                            _hover={{ bg: "none" }}
                            onClick={onClickEditItem}
                          >
                            Chỉnh sửa
                          </Button>
                          <Button
                            colorScheme="blue"
                            variant="ghost"
                            size="xs"
                            _hover={{ bg: "none" }}
                            onClick={onClickRemoveItem}
                          >
                            Xóa
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </GridItem>
                  <GridItem
                    key={`${item.uniqIdentifier}--col2`}
                    colSpan={1}
                    onClick={onClickEditItem}
                  >
                    <Text fontSize="sm" textAlign="right" mt={5}>
                      <DisplayPrice>{calcItemTotalAmount(item)}</DisplayPrice>
                    </Text>
                  </GridItem>
                </>
              );
            })}

            <GridItem colSpan={2}>
              <Text fontSize="sm" mt={5}>
                Tổng tạm tính
              </Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text fontSize="sm" textAlign="right" mt={5}>
                <DisplayPrice>{subtotal}</DisplayPrice>
              </Text>
            </GridItem>

            <GridItem colSpan={2}>
              <Text fontSize="sm" mt={1}>
                Giảm giá
              </Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text fontSize="sm" textAlign="right" mt={1}>
                <DisplayPrice>{0}</DisplayPrice>
              </Text>
            </GridItem>

            <GridItem colSpan={2}>
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
              <Heading size="sm">Thông tin đơn hàng</Heading>
            </GridItem>

            <GridItem colSpan={1}>
              <Text fontSize="sm" mt={3}>
                Tên khách hàng
              </Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text
                fontSize="sm"
                fontWeight="semibold"
                textAlign="right"
                mt={3}
              >
                {userName || "Guest"}
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
                Tại bàn {tableInfo?.name || "Ko xác định"}
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
