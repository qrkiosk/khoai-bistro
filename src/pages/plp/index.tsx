import React from "react";
import { Page } from "zmp-ui";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { useQueryDataFromUrl } from "../../hooks";
import Header from "./Header";
import MainContent from "./MainContent";
import CartDrawer from "./CartDrawer";
import ProductDrawer from "./ProductDrawer";

const CategoriesDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer placement="bottom" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Tất cả danh mục</DrawerHeader>
        <DrawerBody>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

const ProductListPage = () => {
  useQueryDataFromUrl(); // Get storeId and tableId from URL upon PLP page load

  const {
    isOpen: isCategoriesDrawerOpen,
    onOpen: onOpenCategoriesDrawer,
    onClose: onCloseCategoriesDrawer,
  } = useDisclosure();

  return (
    <Page
      style={{ minHeight: "unset" }}
      className="relative flex-1 flex flex-col bg-white"
    >
      <Header onOpen={onOpenCategoriesDrawer} />
      <MainContent />
      <ProductDrawer />
      <CartDrawer />
      <CategoriesDrawer
        isOpen={isCategoriesDrawerOpen}
        onClose={onCloseCategoriesDrawer}
      />
    </Page>
  );
};

export default ProductListPage;
