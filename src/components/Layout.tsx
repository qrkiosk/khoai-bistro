import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { useAuthInquiryOnStartup, useHandlePayment } from "../hooks";
import HomePage from "../pages/home";
import ProductListPage from "../pages/plp";
import CheckoutResultPage from "../pages/result";

const Layout = () => {
  useAuthInquiryOnStartup();
  useHandlePayment();

  return (
    <Box className="flex flex-col h-screen safe-area">
      <Box className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/plp" element={<ProductListPage />} />
          <Route path="/result" element={<CheckoutResultPage />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Layout;
