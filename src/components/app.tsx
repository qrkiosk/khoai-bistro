import React from "react";
import { Routes, Route } from "react-router-dom";
import { App, ZMPRouter, SnackbarProvider, Box } from "zmp-ui";
import { RecoilRoot } from "recoil";

import { Navigation } from "./navigation";
import HomePage from "../pages";
import ProductListPage from "../pages/plp";

const Layout = () => {
  return (
    <Box flex flexDirection="column" className="h-screen">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/plp" element={<ProductListPage />}></Route>
        </Routes>
      </div>
      <Navigation />
    </Box>
  );
};

const MyApp = () => {
  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <Layout />
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};

export default MyApp;
