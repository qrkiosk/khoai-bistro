import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { useAuthInquiryOnStartup } from "../hooks";
import HomePage from "../pages";
import ProductListPage from "../pages/plp";

const Layout = () => {
  useAuthInquiryOnStartup();

  return (
    <Box display="flex" flexDir="column" className="h-screen page-content">
      <Box className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/plp" element={<ProductListPage />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Layout;
