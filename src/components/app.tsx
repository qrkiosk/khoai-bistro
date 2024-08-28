import React from "react";
import { Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider, Box } from "zmp-ui";
import { RecoilRoot } from "recoil";
import HomePage from "../pages";
import About from "../pages/about";
import Form from "../pages/form";
import User from "../pages/user";
import ProductListPage from "../pages/plp";
import { Navigation } from "./navigation";

const MyApp = () => {
  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <Box flex flexDirection="column" className="h-screen">
              <Box className="flex-1 flex flex-col overflow-hidden">
                <AnimationRoutes>
                  <Route path="/" element={<HomePage></HomePage>}></Route>
                  <Route path="/about" element={<About></About>}></Route>
                  <Route path="/form" element={<Form></Form>}></Route>
                  <Route path="/user" element={<User></User>}></Route>

                  <Route path="/plp" element={<ProductListPage />}></Route>
                </AnimationRoutes>
              </Box>
              <Navigation />
            </Box>
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};
export default MyApp;
