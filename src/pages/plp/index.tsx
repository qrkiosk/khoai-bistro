import React from "react";
import { useAtom } from "jotai";
import { Page } from "zmp-ui";

import { searchParamIdsQueryEffect } from "../../state/effects";
import Header from "./Header";
import MainContent from "./MainContent";
import CategoriesDrawer from "./CategoriesDrawer";
import ProductDrawer from "./ProductDrawer";
import CartDrawer from "./CartDrawer";

const ProductListPage = () => {
  useAtom(searchParamIdsQueryEffect);
  return (
    <Page
      style={{ minHeight: "unset" }}
      className="relative flex-1 flex flex-col bg-white"
    >
      <Header />
      <MainContent />
      <CategoriesDrawer />
      <ProductDrawer />
      <CartDrawer />
    </Page>
  );
};

export default ProductListPage;
