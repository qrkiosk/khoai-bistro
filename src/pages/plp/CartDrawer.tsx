import React, { useCallback, useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { authorize } from "zmp-sdk";
import { Icon } from "zmp-ui";
import isEmpty from "lodash/isEmpty";
import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import {
  cartAtom,
  isEditingCartItemAtom,
  productVariantAtom,
  cartSubtotalAtom,
  removeCartItemAtom,
  tableInfoAtom,
} from "../../state";
import { DisplayPrice } from "../../components/display/price";
import Divider from "../../components/Divider";

const CartDrawer = () => {
  const cart = useAtomValue(cartAtom);
  const subtotal = useAtomValue(cartSubtotalAtom);
  const removeCartItem = useSetAtom(removeCartItemAtom);
  const { data: tableInfo } = useAtomValue(tableInfoAtom);
  const setProductVariant = useSetAtom(productVariantAtom);
  const setIsEditingCartItem = useSetAtom(isEditingCartItemAtom);
  const isCartEmpty = isEmpty(cart.items);

  const {
    isOpen: isCartDrawerOpen,
    onOpen: onOpenCartDrawer,
    onClose: onCloseCartDrawer,
  } = useDisclosure();

  const onClickPlaceOrder = useCallback(async () => {
    try {
      const authResult = await authorize({
        scopes: ["scope.userInfo", "scope.userPhonenumber"],
      });
      console.log("placeOrder response", authResult);
    } catch (error) {
      console.error("placeOrder error", error);
    }
  }, []);

  useEffect(() => {
    if (isCartEmpty) onCloseCartDrawer();
  }, [isCartEmpty]);

  return (
    <>
      <Box
        display={isCartEmpty ? "none" : "block"}
        position="sticky"
        left={0}
        right={0}
        bottom={0}
        bgColor="var(--zmp-background-white)"
        p={3}
        onClick={onOpenCartDrawer}
      >
        <Button
          variant="solid"
          colorScheme="green"
          w="100%"
          textAlign="left"
          size="md"
        >
          <Box w="100%" display="flex" justifyContent="space-between">
            <Text>Giỏ hàng • {cart.items.length} món</Text>
            <Text>
              <DisplayPrice>{subtotal}</DisplayPrice>
            </Text>
          </Box>
        </Button>
      </Box>
      <Drawer
        size="full"
        placement="bottom"
        blockScrollOnMount={false}
        isOpen={isCartDrawerOpen}
        onClose={onCloseCartDrawer}
      >
        <DrawerOverlay />
        <DrawerContent h="100%" overflowY="auto" className="page-content">
          <Box>
            <IconButton
              ml={3}
              isRound={true}
              variant="outline"
              aria-label="Close"
              bgColor="var(--zmp-background-white)"
              fontSize="16px"
              icon={<Icon icon="zi-close" />}
              onClick={onCloseCartDrawer}
            />
          </Box>

          <Box display="flex" flexDirection="column" h="100%">
            <Box bgColor="var(--zmp-background-color)" flexGrow={1}>
              <Box p={4} bgColor="var(--zmp-background-white)">
                <Grid templateColumns="repeat(2, 1fr)">
                  <GridItem colSpan={1}>
                    <Box h="100%" display="flex" alignItems="center">
                      <Heading size="sm">Tóm tắt đơn hàng</Heading>
                    </Box>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Box
                      h="100%"
                      display="none"
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      <Button
                        p={0}
                        display="none"
                        colorScheme="blue"
                        variant="ghost"
                        size="xs"
                        textAlign="right"
                        onClick={onCloseCartDrawer}
                      >
                        Thêm món
                      </Button>
                    </Box>
                  </GridItem>

                  {cart.items.map((item) => (
                    <>
                      <GridItem colSpan={1}>
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
                              {item.options.map((option) => (
                                <>
                                  {option.selectedDetail && (
                                    <Text key={option.id} fontSize="xs" pl={2}>
                                      {option.selectedDetail.name}
                                    </Text>
                                  )}
                                  {!isEmpty(option.selectedDetails) && (
                                    <Text key={option.id} fontSize="xs" pl={2}>
                                      {`${option.name}: ${option.selectedDetails
                                        .map((d) => d.name)
                                        .join(",")}`}
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
                                onClick={() => {
                                  removeCartItem(item.uniqIdentifier);
                                }}
                              >
                                Xóa
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <Text fontSize="sm" textAlign="right" mt={5}>
                          <DisplayPrice>
                            {(() => {
                              const baseItemPrice = item.price;
                              const optionsPrice = item.options.reduce(
                                (acc, opt) => {
                                  const selectedDetailPrice =
                                    opt.selectedDetail?.price ?? 0;
                                  const selectedDetailsTotalPrice =
                                    opt.selectedDetails.reduce(
                                      (a, d) => a + d.price,
                                      0
                                    );

                                  return (
                                    acc +
                                    selectedDetailPrice +
                                    selectedDetailsTotalPrice
                                  );
                                },
                                0
                              );

                              return baseItemPrice + optionsPrice;
                            })()}
                          </DisplayPrice>
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
                  <RadioGroup>
                    <Radio checked>Tại quầy</Radio>
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
              onClick={onClickPlaceOrder}
            >
              <Button
                variant="solid"
                colorScheme="green"
                w="100%"
                textAlign="left"
                size="md"
              >
                Xác nhận đặt đơn
              </Button>
            </Box>
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
