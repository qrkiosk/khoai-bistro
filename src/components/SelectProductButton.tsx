import React from "react";
import Icon from "zmp-ui/icon";
import { IconButton } from "@chakra-ui/react";

const SelectProductButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <IconButton
      icon={<Icon size={14} icon="zi-plus" />}
      isRound={true}
      variant="solid"
      colorScheme="green"
      aria-label="Add"
      size="sm"
      position="absolute"
      right="5px"
      bottom="5px"
      onClick={onClick}
    />
  );
};

export default SelectProductButton;
