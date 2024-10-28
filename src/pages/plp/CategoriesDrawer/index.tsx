import React from "react";
import { useAtomValue } from "jotai";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  UnorderedList,
  ListItem,
  Button,
  Text,
} from "@chakra-ui/react";

import {
  categoryRefsMapAtom,
  categoryIdInViewAtom,
  storeProductsByCategoryAtom,
} from "../../../state";
import { APP_ACCENT_COLOR } from "../../../utils/constants";
import { useCategoryDrawer } from "../localState";

const CategoriesDrawer = () => {
  const { isOpen, onClose } = useCategoryDrawer();
  const { data: categories } = useAtomValue(storeProductsByCategoryAtom);
  const categoryRefsMap = useAtomValue(categoryRefsMapAtom);
  const categoryIdInView = useAtomValue(categoryIdInViewAtom);

  return (
    <Drawer placement="bottom" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody p={3}>
          <UnorderedList listStyleType="none" p={0} m={0}>
            {categories.map((category) => {
              const alreadyInView = category.id === categoryIdInView;

              return (
                <ListItem key={category.id} my={1}>
                  <Button
                    variant="ghost"
                    autoFocus={false}
                    size="sm"
                    w="100%"
                    colorScheme={alreadyInView ? APP_ACCENT_COLOR : undefined}
                    justifyContent="flex-start"
                    onClick={() => {
                      if (categoryRefsMap.has(category.id)) {
                        const ref = categoryRefsMap.get(category.id)!;
                        ref.current?.scrollIntoView({ behavior: "instant" });
                        onClose();
                      }
                    }}
                  >
                    <Text fontSize="sm" fontWeight="semibold">
                      {category.name}
                    </Text>
                  </Button>
                </ListItem>
              );
            })}
          </UnorderedList>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default CategoriesDrawer;
