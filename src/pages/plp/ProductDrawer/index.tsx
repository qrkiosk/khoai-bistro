import React, { useCallback, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Icon } from "zmp-ui";
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  Image,
  IconButton,
  Heading,
  Text,
  Button,
  HStack,
  Input,
} from "@chakra-ui/react";

import {
  cartAtom,
  isEditingCartItemAtom,
  productDetailsAtom,
  productVariantQtyAtom,
  selectedProductIdAtom,
  productVariantAtom,
  prepareProductVariantAtom,
  updateProductVariantQtyAtom,
} from "../../../state";
import Divider from "../../../components/Divider";
import { DisplayPrice } from "../../../components/display/price";
import MandatoryOption from "./MandatoryOption";
import NonMandatoryOption from "./NonMandatoryOption";
import SkeletonContent from "./SkeletonContent";
import { productVariantPriceAtom } from "../../../state/index";

const ProductDetailsContent = ({ onClose }: { onClose: () => void }) => {
  const setCart = useSetAtom(cartAtom);
  const isEditingCartItem = useAtomValue(isEditingCartItemAtom);
  const { data: productDetails, isLoading } = useAtomValue(productDetailsAtom);

  const productVariant = useAtomValue(productVariantAtom);
  const productVariantQty = useAtomValue(productVariantQtyAtom);
  const productVariantPrice = useAtomValue(productVariantPriceAtom);
  const prepareProductVariant = useSetAtom(prepareProductVariantAtom);
  const updateProductVariantQty = useSetAtom(updateProductVariantQtyAtom);

  useEffect(() => {
    if (productDetails != null && !isEditingCartItem) {
      prepareProductVariant(productDetails);
    }
  }, [productDetails, isEditingCartItem]);

  if (isLoading || productVariant == null) return <SkeletonContent />;

  return (
    <Box display="flex" flexDirection="column" h="100%">
      <Box bgColor="var(--zmp-background-color)" flexGrow={1}>
        <Image
          src={productVariant.url}
          alt=""
          objectFit="cover"
          w="100%"
          maxHeight="250px"
        />

        <Box p={4} bgColor="var(--zmp-background-white)">
          <Box display="flex" justifyContent="space-between">
            <Heading size="sm">{productVariant.name}</Heading>
            <Box textAlign="right">
              <Heading size="sm">
                <DisplayPrice>{productVariant.price}</DisplayPrice>
              </Heading>
              <Text as="sub" color="gray" fontSize="xs">
                Giá gốc
              </Text>
            </Box>
          </Box>
          <Text color="GrayText" fontSize="xs" mt={2}>
            {productVariant.description}
          </Text>
        </Box>
        <Divider />

        {productVariant.options.map((option) => {
          return (
            <>
              <Box key={option.id} p={4} bgColor="var(--zmp-background-white)">
                {option.isMandatory ? (
                  <MandatoryOption option={option} />
                ) : (
                  <NonMandatoryOption option={option} />
                )}
              </Box>
              <Divider />
            </>
          );
        })}

        <Box
          display="flex"
          justifyContent="center"
          p={4}
          bgColor="var(--zmp-background-white)"
        >
          <HStack maxW="180px">
            <Button onClick={() => updateProductVariantQty("DEC")}>
              <Text fontSize={20}>–</Text>
            </Button>
            <Input
              readOnly
              value={productVariantQty}
              textAlign="center"
              fontWeight="semibold"
              fontSize={20}
            />
            <Button onClick={() => updateProductVariantQty("INC")}>
              <Text fontSize={20}>+</Text>
            </Button>
          </HStack>
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
        onClick={onClose}
      >
        <Button
          variant="solid"
          colorScheme="green"
          w="100%"
          textAlign="left"
          size="md"
          onClick={() => {
            setCart((currentState) => {
              if (isEditingCartItem) {
                return {
                  ...currentState,
                  items: currentState.items.map((item) =>
                    item.uniqIdentifier === productVariant.uniqIdentifier
                      ? { ...productVariant }
                      : item
                  ),
                };
              }

              return {
                ...currentState,
                items: currentState.items.concat({ ...productVariant }),
              };
            });

            onClose();
          }}
        >
          <Box w="100%" display="flex" justifyContent="space-between">
            <Text>{isEditingCartItem ? "Cập nhật" : "Thêm vào"} giỏ hàng</Text>
            <Text>
              <DisplayPrice>{productVariantPrice}</DisplayPrice>
            </Text>
          </Box>
        </Button>
      </Box>
    </Box>
  );
};

const ProductDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProductId, setSelectedProductId] = useAtom(
    selectedProductIdAtom
  );
  const [isEditingCartItem, setIsEditingCartItem] = useAtom(
    isEditingCartItemAtom
  );
  const setProductVariant = useSetAtom(productVariantAtom);

  const resetGlobalState = useCallback(() => {
    setSelectedProductId(null);
    setIsEditingCartItem(false);
    setProductVariant(null);
  }, []);

  const onCloseProductDrawer = useCallback(() => {
    resetGlobalState();
    onClose();
  }, []);

  useEffect(() => {
    if (selectedProductId != null || isEditingCartItem) onOpen();
  }, [selectedProductId, isEditingCartItem]);

  useEffect(() => resetGlobalState, []); // reset on unmount

  return (
    <Drawer
      size="full"
      placement="bottom"
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onCloseProductDrawer}
    >
      <DrawerOverlay />
      <DrawerContent h="100%" overflowY="auto">
        <IconButton
          isRound={true}
          position="absolute"
          top="var(--zaui-safe-area-inset-top, 16px)"
          left={3}
          variant="outline"
          aria-label="Close"
          bgColor="var(--zmp-background-white)"
          fontSize="16px"
          zIndex={999}
          icon={<Icon icon="zi-close" />}
          onClick={onCloseProductDrawer}
        />
        <ErrorBoundary
          fallback={<Text fontSize={14}>Lỗi: Không thể tải sản phẩm...</Text>}
        >
          <ProductDetailsContent onClose={onCloseProductDrawer} />
        </ErrorBoundary>
      </DrawerContent>
    </Drawer>
  );
};

export default ProductDrawer;
