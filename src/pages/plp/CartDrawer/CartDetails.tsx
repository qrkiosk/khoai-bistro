import React from "react";
import { useAtomValue, useSetAtom } from "jotai";
import isEmpty from "lodash/isEmpty";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
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
  setPaymentTypeAtom,
} from "../../../state";
import { useCartDrawer } from "../../../hooks";
import { APP_ACCENT_COLOR } from "../../../utils/constants";
import {
  calcItemTotalAmount,
  genMultiChoiceOptionDisplayText,
} from "../../../utils/cart";
import { DisplayPrice } from "../../../components/prices";
import Divider from "../../../components/Divider";
import PlaceOrderButton from "./PlaceOrderButton";

const CartDetails = () => {
  const { onClose } = useCartDrawer();
  const cart = useAtomValue(cartAtom);
  const subtotal = useAtomValue(cartSubtotalAtom);
  const removeCartItem = useSetAtom(removeCartItemAtom);
  const { data: tableInfo } = useAtomValue(tableInfoAtom);
  const userName = useAtomValue(userNameAtom);
  const setProductVariant = useSetAtom(productVariantAtom);
  const setIsEditingCartItem = useSetAtom(isEditingCartItemAtom);
  const setPaymentType = useSetAtom(setPaymentTypeAtom);

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
                  colorScheme={APP_ACCENT_COLOR}
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
                          colorScheme={APP_ACCENT_COLOR}
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
                            colorScheme={APP_ACCENT_COLOR}
                            variant="ghost"
                            size="xs"
                            _hover={{ bg: "none" }}
                            onClick={onClickEditItem}
                          >
                            Chỉnh sửa
                          </Button>
                          <Button
                            colorScheme={APP_ACCENT_COLOR}
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
                {`Tại bàn ${tableInfo?.name || ""}`.trim()}
              </Text>
            </GridItem>
          </Grid>
        </Box>
        <Divider />
      </Box>

      <PlaceOrderButton />
    </Box>
  );
};

export default CartDetails;
