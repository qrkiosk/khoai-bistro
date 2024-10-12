import React, { useCallback, useMemo } from "react";
import { useSetAtom } from "jotai";
import {
  Box,
  Heading,
  Text,
  Stack,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";

import { setVariantSelectedDetailsAtom } from "../state";
import { OptionWithSelectedDetail } from "../types/product";
import { DisplayPrice } from "./prices";

const NonMandatoryOption = ({
  option,
}: {
  option: OptionWithSelectedDetail;
}) => {
  const setVariantSelectedDetails = useSetAtom(setVariantSelectedDetailsAtom);

  const selectedDetails = useMemo(
    () => option.selectedDetails.map((detail) => detail.id),
    [option.selectedDetails]
  );
  const setSelectedDetails = useCallback(
    (checkedDetailIds: string[]) => {
      setVariantSelectedDetails(option.id, checkedDetailIds);
    },
    [option.id]
  );

  return (
    <Box>
      <Heading size="sm" mb={3}>
        {option.name}
      </Heading>
      <CheckboxGroup value={selectedDetails} onChange={setSelectedDetails}>
        <Stack>
          {option.details.map((detail) => (
            <Box
              key={detail.id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Checkbox value={detail.id}>{detail.name}</Checkbox>
              <Text>
                {detail.price > 0 && "+ "}
                <DisplayPrice>{detail.price}</DisplayPrice>
              </Text>
            </Box>
          ))}
        </Stack>
      </CheckboxGroup>
    </Box>
  );
};

export default NonMandatoryOption;
