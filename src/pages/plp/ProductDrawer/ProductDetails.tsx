import React, { useCallback, useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { authorize, getUserInfo } from "zmp-sdk";
import { Box, Image, Heading, Text, Button, HStack } from "@chakra-ui/react";

import {
  addToCartAtom,
  isEditingCartItemAtom,
  productDetailsAtom,
  productVariantQtyAtom,
  productVariantAtom,
  productVariantPriceAtom,
  prepareProductVariantAtom,
  updateProductVariantQtyAtom,
  removeCartItemAtom,
  userInfoAtom,
  isUserAuthorizedAtom,
} from "../../../state";
import { APP_ACCENT_COLOR, APP_DANGER_COLOR } from "../../../utils/constants";
import Divider from "../../../components/Divider";
import { SkeletonContent } from "../../../components/skeletons";
import { Price, ProductPrice } from "../../../components/prices";
import { useProductDrawer } from "./localState";
import NoteTextarea from "./NoteTextarea";
import ProductOption from "./ProductOption";

const ProductDetails = () => {
  const { onClose } = useProductDrawer();
  const addToCart = useSetAtom(addToCartAtom);
  const addToCartAndClose = useCallback(() => {
    addToCart();
    onClose();
  }, []);

  const isEditingCartItem = useAtomValue(isEditingCartItemAtom);
  const { data: productDetails, isLoading } = useAtomValue(productDetailsAtom);

  const productVariant = useAtomValue(productVariantAtom);
  const productVariantQty = useAtomValue(productVariantQtyAtom);
  const productVariantPrice = useAtomValue(productVariantPriceAtom);
  const prepareProductVariant = useSetAtom(prepareProductVariantAtom);
  const updateProductVariantQty = useSetAtom(updateProductVariantQtyAtom);
  const minQty = isEditingCartItem ? 0 : 1;

  const removeFromCart = useSetAtom(removeCartItemAtom);
  const shouldRemoveFromCart = productVariantQty === 0;

  const isUserAuthorized = useAtomValue(isUserAuthorizedAtom);
  const setUserInfo = useSetAtom(userInfoAtom);
  const addToCartWithAuthInquiry = async () => {
    try {
      if (isUserAuthorized) {
        addToCartAndClose();
        return;
      }

      const authResult = await authorize({
        scopes: ["scope.userInfo"],
      });

      if (!authResult["scope.userInfo"]) return;

      const getUserInfoResult = await getUserInfo();
      setUserInfo(getUserInfoResult.userInfo);
      addToCartAndClose();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (productDetails != null && !isEditingCartItem) {
      prepareProductVariant(productDetails);
    }
  }, [productDetails, isEditingCartItem]);

  if (isLoading || productVariant == null) return <SkeletonContent />;

  return (
    <Box h="100%" display="flex" flexDir="column">
      <Box flexGrow={1} overflowY="auto" bgColor="var(--zmp-background-color)">
        <Image
          src={productVariant.url}
          alt=""
          objectFit="cover"
          w="100%"
          minHeight="260px"
          maxHeight="260px"
        />

        <Box p={4} bgColor="var(--zmp-background-white)">
          <Box display="flex" justifyContent="space-between">
            <Heading size="sm">{productVariant.name}</Heading>
            <Box display="flex" flexDir="column" alignItems="flex-end" mb={4}>
              <ProductPrice size="lg" emphasizeSalePrice>
                {[productVariant.price, productVariant.priceSale]}
              </ProductPrice>
              <Text as="sub" color="gray" fontSize="xs" mt={1}>
                Giá gốc
              </Text>
            </Box>
          </Box>
          <Text color="GrayText" fontSize="xs" mt={2}>
            {productVariant.description}
          </Text>
        </Box>
        <Divider />

        {productVariant.options.map((option) => (
          <ProductOption key={option.id}>{option}</ProductOption>
        ))}

        <Box
          p={4}
          bgColor="var(--zmp-background-white)"
          display="flex"
          flexDir="column"
          alignItems="center"
        >
          <Box w="100%" mb={3} display="flex" alignItems="flex-end">
            <Heading size="sm">Thêm lưu ý cho quán</Heading>
            <Text fontSize="xs" color="GrayText" ml={2}>
              Không bắt buộc
            </Text>
          </Box>
          <NoteTextarea />
          <HStack maxW="180px">
            <Button
              isDisabled={productVariantQty === minQty}
              onClick={() => updateProductVariantQty("DEC", minQty)}
            >
              <Text fontSize="xl" color="var(--chakra-colors-blue-500)">
                –
              </Text>
            </Button>
            <Box minW="50px" textAlign="center">
              <Heading fontSize="xl">{productVariantQty}</Heading>
            </Box>
            <Button onClick={() => updateProductVariantQty("INC")}>
              <Text fontSize="xl" color="var(--chakra-colors-blue-500)">
                ＋
              </Text>
            </Button>
          </HStack>
        </Box>
        <Divider />
      </Box>

      <Box
        className="sticky left-0 right-0 bottom-0 p-3"
        bgColor="var(--zmp-background-white)"
        boxShadow="0px -4px 6px rgba(0, 0, 0, 0.1)"
      >
        {shouldRemoveFromCart ? (
          <Button
            variant="solid"
            autoFocus={false}
            colorScheme={APP_DANGER_COLOR}
            w="100%"
            textAlign="left"
            size="md"
            onClick={() => {
              removeFromCart(productVariant.uniqIdentifier);
              onClose();
            }}
          >
            Xoá khỏi giỏ hàng
          </Button>
        ) : (
          <Button
            variant="solid"
            autoFocus={false}
            colorScheme={APP_ACCENT_COLOR}
            w="100%"
            borderRadius="lg"
            textAlign="left"
            size="lg"
            onClick={addToCartWithAuthInquiry}
          >
            <Box w="100%" display="flex" justifyContent="space-between">
              <Text>
                {isEditingCartItem ? "Cập nhật" : "Thêm vào"} giỏ hàng
              </Text>
              <Price variant="unstyled" size="lg">
                {productVariantPrice}
              </Price>
            </Box>
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ProductDetails;
