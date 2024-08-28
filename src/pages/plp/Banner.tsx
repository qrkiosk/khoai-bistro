import React from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box } from "zmp-ui";

function getDummyImage(filename: string) {
  return `https://stc-zmp.zadn.vn/templates/zaui-coffee/dummy/${filename}`;
}

const Banner = () => {
  return (
    <Box className="bg-white" p={3}>
      <img
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        src={getDummyImage("banner-1.webp")}
      />
    </Box>
  );
};

export default Banner;
