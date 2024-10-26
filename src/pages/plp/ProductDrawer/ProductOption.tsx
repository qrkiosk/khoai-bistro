import React from "react";
import { Box } from "@chakra-ui/react";

import { OptionWithSelectedDetail } from "../../../types/product";
import MandatoryOption from "../../../components/MandatoryOption";
import NonMandatoryOption from "../../../components/NonMandatoryOption";
import Divider from "../../../components/Divider";

const ProductOption = ({
  children: option,
}: {
  children: OptionWithSelectedDetail;
}) => {
  return (
    <>
      <Box p={4} bgColor="var(--zmp-background-white)">
        {option.isMandatory ? (
          <MandatoryOption option={option} />
        ) : (
          <NonMandatoryOption option={option} />
        )}
      </Box>
      <Divider />
    </>
  );
};

export default ProductOption;
