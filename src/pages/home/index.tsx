import React, { useEffect } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import { Page, useNavigate } from "zmp-ui";

import { getTestSearchParams } from "../../utils/product";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const search = getTestSearchParams();
    setTimeout(() => navigate({ pathname: "/plp", search }), 500);
  }, []);

  return (
    <Page className="page">
      <Box h="100%" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="lg" />
      </Box>
    </Page>
  );
};

export default HomePage;
