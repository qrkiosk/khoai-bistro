import React from "react";
import { Page } from "zmp-ui";

import { useQueryDataFromUrl } from "../../hooks";
import Header from "./Header";
import MainContent from "./MainContent";
import CategoriesDrawer from "./CategoriesDrawer";
import ProductDrawer from "./ProductDrawer";
import CartDrawer from "./CartDrawer";

const ProductListPage = () => {
  useQueryDataFromUrl(); // Get storeId, tableId, companyId from URL upon PLP page load
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
