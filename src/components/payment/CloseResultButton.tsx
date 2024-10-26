import React from "react";
import { Box, Button } from "@chakra-ui/react";

import { APP_ACCENT_COLOR } from "../../utils/constants";

const CloseResultButton = ({
  onClose,
  children,
}: {
  onClose: () => void;
  children: string;
}) => {
  return (
    <Box p={4}>
      <Button
        variant="solid"
        autoFocus={false}
        colorScheme={APP_ACCENT_COLOR}
        size="lg"
        w="100%"
        borderRadius="lg"
        onClick={onClose}
      >
        {children}
      </Button>
    </Box>
  );
};

export default CloseResultButton;
