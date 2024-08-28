import React from "react";
import { Box } from "zmp-ui";

const Section = ({ children }) => (
  <Box
    p={4}
    mb={6}
    style={{
      padding: 16,
      background: "#FFFFFF",
      borderRadius: 8,
      marginBottom: 24,
    }}
  >
    {children}
  </Box>
);

export default Section;
