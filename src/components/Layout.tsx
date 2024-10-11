import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import HomePage from "../pages";
import ProductListPage from "../pages/plp";

const Layout = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      className="h-screen page-content"
    >
      <Box className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/plp" element={<ProductListPage />}></Route>
        </Routes>
      </Box>
    </Box>
  );
};

export default Layout;
