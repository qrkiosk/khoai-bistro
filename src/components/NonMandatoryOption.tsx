import React, { useCallback, useMemo } from "react";
import { useSetAtom } from "jotai";
import {
  Box,
  Heading,
  Text,
  Stack,
  CheckboxGroup,
  Checkbox,
  Divider as LineDivider,
} from "@chakra-ui/react";

import { setVariantSelectedDetailsAtom } from "../state";
import { OptionWithSelectedDetail } from "../types/product";
import { Price } from "./prices";

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
        <Stack rowGap={3}>
          {option.details.map((detail, idx) => {
            const isLast = idx === option.details.length - 1;

            return (
              <Box key={detail.id}>
                <Box
                  as="label"
                  htmlFor={detail.id}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box display="flex">
                    <Checkbox id={detail.id} value={detail.id} />
                    <Text as="span" fontSize="sm" ml={3}>
                      {detail.name}
                    </Text>
                  </Box>
                  {detail.price > 0 && (
                    <Price as="span" variant="standard" prefix="+">
                      {detail.price}
                    </Price>
                  )}
                </Box>
                {!isLast && <LineDivider mt={3} />}
              </Box>
            );
          })}
        </Stack>
      </CheckboxGroup>
    </Box>
  );
};

export default NonMandatoryOption;
