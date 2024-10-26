import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

type ResultTemplateProps = {
  title?: string;
  message: string;
  icon: React.ReactNode;
};

const ResultTemplate = ({ title, message, icon }: ResultTemplateProps) => (
  <Box className="flex-1 flex flex-col justify-center items-center text-center px-6 space-y-3">
    <Box p={4}>{icon}</Box>
    {title && <Heading size="md">{title}</Heading>}
    <Text color="GrayText">{message}</Text>
  </Box>
);

export default ResultTemplate;
