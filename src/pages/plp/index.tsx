import React from "react";
import { Box, Header, Text, Page } from "zmp-ui";
import { useRecoilValueLoadable } from "recoil";

import PlpHeader from "./PlpHeader";
import Banner from "./Banner";
import Divider from "../../components/Divider";
import ProductList from "./ProductList";

const img = {
  src: "https://img.freepik.com/free-vector/black-white-coffee-shop-background_125540-817.jpg",
  alt: "plp-banner",
};

const ProductListPage: React.FC = () => {
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <PlpHeader />
      <div className="flex-1 overflow-auto">
        <Banner />
        <Divider />
        <ProductList />
      </div>
    </Page>
  );
};

export default ProductListPage;
