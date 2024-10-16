import React, { useCallback } from "react";
import { useSetAtom } from "jotai";
import { Box, Heading, Text, RadioGroup, Radio, Stack } from "@chakra-ui/react";

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
        onChange={setSelectedDetail}
        value={option.selectedDetail?.id}
      >
        <Stack>
          {option.details.map((detail) => (
            <Box
              key={detail.id}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Radio value={detail.id}>{detail.name}</Radio>
              {detail.price > 0 && (
                <Text>
                  +<DisplayPrice>{detail.price}</DisplayPrice>
                </Text>
              )}
            </Box>
          ))}
        </Stack>
      </RadioGroup>
    </Box>
  );
};

export default MandatoryOption;
