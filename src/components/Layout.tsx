import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useAtomValue, useSetAtom } from "jotai";
import { authorize, getUserInfo } from "zmp-sdk";

import { isUserAuthorizedAtom, userInfoAtom } from "../state";
import HomePage from "../pages";
import ProductListPage from "../pages/plp";

const Layout = () => {
  const isUserAuthorized = useAtomValue(isUserAuthorizedAtom);
  const setUserInfo = useSetAtom(userInfoAtom);

  useEffect(() => {
    if (isUserAuthorized) return;

    setTimeout(async () => {
      const authResult = await authorize({
        scopes: ["scope.userInfo" /*, "scope.userPhonenumber" */],
      });

      if (!authResult["scope.userInfo"]) return;

      const getUserInfoResult = await getUserInfo();
      setUserInfo(getUserInfoResult.userInfo);
    }, 1500);
  }, []);

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
