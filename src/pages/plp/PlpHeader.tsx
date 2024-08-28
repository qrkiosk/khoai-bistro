import React from "react";
import {
  Box,
  Header,
  Text,
  Page,
  Input,
  useNavigate,
  Button,
  Icon,
} from "zmp-ui";
import { useRecoilValueLoadable } from "recoil";
import logo from "../../static/icons/logo.png";

const PlpHeader = () => {
  const navigate = useNavigate();

  return (
    <Header
      style={{ height: "auto", position: "sticky" }}
      showBackIcon={false}
      title={
        <Box>
          <Box flex alignItems="center" className="space-x-2">
            <img className="w-8 h-8 rounded-lg border-inset" src={logo} />
            <Box>
              <Text.Title size="small">Khoai Bistro</Text.Title>
              <Text size="xxSmall" className="text-gray">
                Welcome, user!
              </Text>
            </Box>
          </Box>
          <Box flex alignItems="center" pt={1} className="space-x-2">
            <Box style={{ flexGrow: 1 }}>
              <Input.Search
                size="small"
                onFocus={() => navigate("/search")}
                placeholder="Tìm nhanh món..."
              />
            </Box>
            <Button variant="secondary" type="neutral" size="small">
              Danh mục
            </Button>
          </Box>
        </Box>
      }
    />
  );
};

export default PlpHeader;
