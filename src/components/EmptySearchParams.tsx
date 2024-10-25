import React from "react";
import { Box, Heading, Image, Text } from "@chakra-ui/react";

import error404Img from "../static/images/error404.webp";

const EmptySearchParams = () => {
  return (
    <Box className="flex-1 flex flex-col justify-center items-center text-center px-6 space-y-3">
      <Image src={error404Img} minW="260px" maxW="260px" mb={3} />
      <Heading size="md">Không tìm thấy trang</Heading>
      <Text color="GrayText">
        Chúng tôi không thể tìm thấy nội dung bạn đang yêu cầu. Vui lòng kiểm
        tra lại đường link hoặc QR code dẫn vào ứng dụng.
      </Text>
    </Box>
  );
};

export default EmptySearchParams;
