import React from "react";
import { Icon } from "zmp-ui";
import { IconButton } from "@chakra-ui/react";

import { useCartDrawer } from "../../../hooks";

const CloseCartButton = () => {
  const { onClose } = useCartDrawer();

  return (
    <IconButton
      isRound={true}
      autoFocus={false}
      variant="outline"
      aria-label="Close"
      bgColor="var(--zmp-background-white)"
      _hover={{ bgColor: "var(--zmp-background-white)" }}
      fontSize="md"
      icon={<Icon icon="zi-close" />}
      onClick={onClose}
    />
  );
};

export default CloseCartButton;
