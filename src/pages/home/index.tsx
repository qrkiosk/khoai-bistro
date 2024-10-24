import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { Box, Spinner } from "@chakra-ui/react";
import { Page, useNavigate } from "zmp-ui";

import { delay } from "../../utils";
import { getTestSearchParams, verifyLocationSearch } from "../../utils/product";

const HomePage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    delay(500).then(() => {
      navigate({
        pathname: "/plp",
        search: verifyLocationSearch(search) ? search : getTestSearchParams(),
      });
    });
  }, []);

  return (
    <Page>
      <Box h="100%" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="lg" />
      </Box>
    </Page>
  );
};

export default HomePage;
