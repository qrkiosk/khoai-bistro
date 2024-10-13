import React, { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  HStack,
  Input,
} from "@chakra-ui/react";

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
} from "../../../state";
import Divider from "../../../components/Divider";
import { SkeletonContent } from "../../../components/skeletons";
import { DisplayPrice } from "../../../components/prices";
import MandatoryOption from "../../../components/MandatoryOption";
import NonMandatoryOption from "../../../components/NonMandatoryOption";
import { useProductDrawer } from "./localState";

const ProductDetails = () => {
  const { onClose } = useProductDrawer();
  const addToCart = useSetAtom(addToCartAtom);
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

  useEffect(() => {
    if (productDetails != null && !isEditingCartItem) {
      prepareProductVariant(productDetails);
    }
  }, [productDetails, isEditingCartItem]);

  if (isLoading || productVariant == null) return <SkeletonContent />;

  return (
    <Box h="100%" display="flex" flexDirection="column">
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

        {productVariant.options.map((option) => (
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
        ))}

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={4}
          bgColor="var(--zmp-background-white)"
        >
          <Box w="100%" mb={1}>
            <Heading size="sm">Số lượng</Heading>
          </Box>
          <HStack maxW="180px">
            <Button
              isDisabled={productVariantQty === minQty}
              onClick={() => updateProductVariantQty("DEC", minQty)}
            >
              <Text fontSize="xl">–</Text>
            </Button>
            <Input
              readOnly
              value={productVariantQty}
              textAlign="center"
              fontWeight="semibold"
              fontSize="xl"
            />
            <Button onClick={() => updateProductVariantQty("INC")}>
              <Text fontSize="xl">+</Text>
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
      >
        {shouldRemoveFromCart ? (
          <Button
            variant="solid"
            autoFocus={false}
            colorScheme="red"
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
            colorScheme="green"
            w="100%"
            textAlign="left"
            size="md"
            onClick={() => {
              addToCart();
              onClose();
            }}
          >
            <Box w="100%" display="flex" justifyContent="space-between">
              <Text>
                {isEditingCartItem ? "Cập nhật" : "Thêm vào"} giỏ hàng
              </Text>
              <Text>
                <DisplayPrice>{productVariantPrice}</DisplayPrice>
              </Text>
            </Box>
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ProductDetails;
