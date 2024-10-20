import React, { useCallback } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { RESET } from "jotai/utils";
import { Header as ZHeader, Icon } from "zmp-ui";
import {
  Box,
  Button,
  ButtonGroup,
  CloseButton,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";

import logo from "../../../static/icons/logo.png";
import {
  categoryNameInViewAtom,
  userInfoAtom,
  userNameAtom,
} from "../../../state";
import { APP_ACCENT_COLOR } from "../../../utils/constants";
import { useCategoryDrawer } from "../localState";
import {
  inputAtom,
  useSearchMode,
  useDebouncedSearchQueryUpdate,
} from "./localState";
import TableInfo from "./TableInfo";

const HeaderContent = () => {
  const { onOpen } = useCategoryDrawer();
  const [input, setInput] = useAtom(inputAtom);
  const {
    isInSearchMode,
    onEnter: onEnterSearchMode,
    onExit,
  } = useSearchMode();
  const categoryNameInView = useAtomValue(categoryNameInViewAtom);
  const userName = useAtomValue(userNameAtom);

  const onChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value),
    []
  );
  const onExitSearchMode = useCallback(() => {
    onExit();
    setInput("");
  }, []);
  useDebouncedSearchQueryUpdate();
  const setUserInfo = useSetAtom(userInfoAtom);

  return (
    <Grid
      templateRows={`repeat(3, 1fr)`}
      templateColumns="repeat(3, 1fr)"
      rowGap={2}
    >
      <GridItem colSpan={2}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" className="space-x-2">
            <Image className="w-8 h-8 rounded-lg border-inset" src={logo} />
            <Box>
              <Heading size="xs" fontWeight="semibold">
                Khoai Bistro
              </Heading>
              <Text fontSize="xs" fontWeight="normal">
                Xin chào {userName || "quý khách"}!
              </Text>
            </Box>
          </Box>
          <TableInfo />
        </Box>
      </GridItem>
      <GridItem colSpan={1}>
        {/* This col is for the mini app minimize button */}
      </GridItem>

      <GridItem colSpan={3}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <ButtonGroup size="sm" isAttached variant="outline">
            <Button onClick={() => setUserInfo(RESET)}>Gọi nhân viên</Button>
            <Button>Gọi thanh toán</Button>
            <Button variant="solid" colorScheme={APP_ACCENT_COLOR}>
              Nhắn tin Zalo
            </Button>
          </ButtonGroup>
        </Box>
      </GridItem>

      <GridItem colSpan={3}>
        {isInSearchMode ? (
          <InputGroup size="sm">
            <Input
              autoFocus
              placeholder="Nhập từ khoá"
              borderRadius="md"
              value={input}
              onChange={onChangeInput}
            />
            <InputRightElement>
              <CloseButton
                size="sm"
                _hover={{ bg: "none" }}
                onClick={onExitSearchMode}
              />
            </InputRightElement>
          </InputGroup>
        ) : (
          <Box display="flex" alignItems="center" className="space-x-2">
            <Box display="flex" flexGrow={1}>
              <Button
                variant="outline"
                size="sm"
                w="100%"
                p="0 8px"
                justifyContent="space-between"
                rightIcon={<Icon icon="zi-chevron-down" size={20} />}
                onClick={onOpen}
              >
                {categoryNameInView ?? "Tất cả danh mục"}
              </Button>
            </Box>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Icon icon="zi-search" size={20} />}
              onClick={onEnterSearchMode}
            >
              Tìm
            </Button>
          </Box>
        )}
      </GridItem>
    </Grid>
  );
};

const Header = () => {
  return (
    <ZHeader
      showBackIcon={false}
      title={(<HeaderContent />) as unknown as string}
      style={{ position: "sticky", height: "auto", padding: "8px 12px" }}
    />
  );
};

export default Header;
