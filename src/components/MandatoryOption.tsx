import React, { useCallback } from "react";
import { useSetAtom } from "jotai";
import {
  Box,
  Heading,
  Text,
  RadioGroup,
  Radio,
  Stack,
  Divider as LineDivider,
} from "@chakra-ui/react";

import { setVariantSelectedDetailAtom } from "../state";
import { DisplayPrice } from "./prices";
import { OptionWithSelectedDetail } from "../types/product";

const MandatoryOption = ({ option }: { option: OptionWithSelectedDetail }) => {
  const setVariantSelectedDetail = useSetAtom(setVariantSelectedDetailAtom);

  const setSelectedDetail = useCallback(
    (checkedDetailId: string) => {
      setVariantSelectedDetail(option.id, checkedDetailId);
    },
    [option.id]
  );

  return (
    <Box>
      <Heading size="sm" mb={3}>
        {option.name}
      </Heading>
      <RadioGroup
        value={option.selectedDetail?.id}
        onChange={setSelectedDetail}
      >
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
                    <Radio id={detail.id} value={detail.id} />
                    <Text as="span" ml={3}>
                      {detail.name}
                    </Text>
                  </Box>
                  {detail.price > 0 && (
                    <Text as="span">
                      +<DisplayPrice>{detail.price}</DisplayPrice>
                    </Text>
                  )}
                </Box>
                {!isLast && <LineDivider mt={3} />}
              </Box>
            );
          })}
        </Stack>
      </RadioGroup>
    </Box>
  );
};

export default MandatoryOption;
