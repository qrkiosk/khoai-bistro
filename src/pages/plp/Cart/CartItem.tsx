import React, { useCallback } from "react";
import { useSetAtom } from "jotai";
import isEmpty from "lodash/isEmpty";
import { Box, Button, GridItem, Heading, Stack, Text } from "@chakra-ui/react";

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
import { CartProductVariant } from "../../../types/cart";

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
      <GridItem key={`${item.uniqIdentifier}--col1`} colSpan={2}>
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
        key={`${item.uniqIdentifier}--col2`}
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
