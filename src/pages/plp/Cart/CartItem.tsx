import React, { useCallback } from "react";
import { useSetAtom } from "jotai";
import isEmpty from "lodash/isEmpty";
import { Box, Button, GridItem, Heading, Stack, Text } from "@chakra-ui/react";

import { OptionWithSelectedDetail } from "../../../types/product";
import { CartProductVariant } from "../../../types/cart";
import {
  isEditingCartItemAtom,
  productVariantAtom,
  removeCartItemAtom,
} from "../../../state";
import { APP_ACCENT_COLOR } from "../../../utils/constants";
import {
  calcItemTotalAmount,
  genMultiChoiceOptionDisplayText,
} from "../../../utils/cart";
import { Price } from "../../../components/prices";

const CartItemOption = ({
  children: option,
}: {
  children: OptionWithSelectedDetail;
}) => {
  if (option.selectedDetail) {
    return <Text fontSize="sm">{option.selectedDetail.name}</Text>;
  }

  if (!isEmpty(option.selectedDetails)) {
    return <Text fontSize="sm">{genMultiChoiceOptionDisplayText(option)}</Text>;
  }

  return null;
};

const CartItem = ({ children: item }: { children: CartProductVariant }) => {
  const removeCartItem = useSetAtom(removeCartItemAtom);
  const setProductVariant = useSetAtom(productVariantAtom);
  const setIsEditingCartItem = useSetAtom(isEditingCartItemAtom);

  const onClickEditItem = useCallback(() => {
    setProductVariant(item);
    setIsEditingCartItem(true);
  }, [item]);

  const onClickRemoveItem = useCallback(() => {
    removeCartItem(item.uniqIdentifier);
  }, [item.uniqIdentifier]);

  return (
    <>
      <GridItem colSpan={2}>
        <Box h="100%" w="100%" display="flex" mt={5}>
          <Box className="clickable-area" onClick={onClickEditItem}>
            <Button
              colorScheme={APP_ACCENT_COLOR}
              variant="outline"
              size="sm"
              p={0}
            >
              {item.quantity}x
            </Button>
          </Box>
          <Box flexGrow={1}>
            <Box
              className="clickable-area"
              flexGrow={1}
              ml={2}
              onClick={onClickEditItem}
            >
              <Heading size="xs" mb={1}>
                {item.name}
              </Heading>
              <Stack rowGap={1}>
                {item.options.map((opt) => (
                  <CartItemOption key={opt.id}>{opt}</CartItemOption>
                ))}
                {item.note && (
                  <Text fontSize="xs" color="GrayText">
                    {item.note}
                  </Text>
                )}
              </Stack>
            </Box>
            <Box mt={2} display="flex" alignItems="stretch">
              <Button
                colorScheme={APP_ACCENT_COLOR}
                variant="ghost"
                size="xs"
                _hover={{ bg: "none" }}
                onClick={onClickEditItem}
              >
                Sửa
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
              <Box
                flexGrow={1}
                className="clickable-area"
                onClick={onClickEditItem}
              />
            </Box>
          </Box>
        </Box>
      </GridItem>
      <GridItem
        colSpan={1}
        className="clickable-area"
        onClick={onClickEditItem}
      >
        <Price variant="standard" textAlign="right" mt={5}>
          {calcItemTotalAmount(item)}
        </Price>
      </GridItem>
    </>
  );
};

export default CartItem;
