import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useSetAtom } from "jotai";
import { Page } from "zmp-ui";

import { setSearchParamIdsAtom } from "../../state";
import { verifyLocationSearch } from "../../utils/product";
import EmptySearchParams from "../../components/EmptySearchParams";
import Header from "./Header";
import MainContent from "./MainContent";
import CategoriesDrawer from "./CategoriesDrawer";
import ProductDrawer from "./ProductDrawer";
import Cart from "./Cart";

const ProductListPage = () => {
  const setSearchParamIds = useSetAtom(setSearchParamIdsAtom);
  const { search } = useLocation();

  useEffect(() => {
    setSearchParamIds(search);
  }, [search]);

  if (!verifyLocationSearch(search)) return <EmptySearchParams />;

  return (
    <Page className="flex-1 flex flex-col relative bg-white">
      <Header />
      <MainContent />
      <CategoriesDrawer />
      <ProductDrawer />
      <Cart />
    </Page>
  );
};

export default ProductListPage;
