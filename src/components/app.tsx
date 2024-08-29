import React from "react";
import { Routes, Route } from "react-router-dom";
import { App, ZMPRouter, SnackbarProvider, Box } from "zmp-ui";
import { RecoilRoot } from "recoil";

import { getConfig } from "../utils/config";
import { ConfigProvider } from "./config-provider";
import { Navigation } from "./navigation";
import HomePage from "../pages";
import ProductListPage from "../pages/plp";

const cssVariables = {
  "--zmp-primary-color": getConfig((c) => c.template.primaryColor),
  "--zmp-background-color": "#f4f5f6",
  "--zmp-background-white": "#ffffff",
};

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
      <ConfigProvider cssVariables={cssVariables}>
        <App>
          <SnackbarProvider>
            <ZMPRouter>
              <Layout />
            </ZMPRouter>
          </SnackbarProvider>
        </App>
      </ConfigProvider>
    </RecoilRoot>
  );
};

export default MyApp;
