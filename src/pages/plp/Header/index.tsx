import React, { useCallback } from "react";
import { useAtom, useAtomValue } from "jotai";
import { Header as ZHeader, Icon } from "zmp-ui";
import {
  Box,
  Button,
  ButtonGroup,
  CloseButton,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";

import logo from "../../../static/icons/logo.png";
import { categoryNameInViewAtom } from "../../../state";
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

  const onChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value),
    []
  );
  const onExitSearchMode = useCallback(() => {
    onExit();
    setInput("");
  }, []);
  useDebouncedSearchQueryUpdate();

  return (
    <Grid
      templateRows={`repeat(3, 1fr)`}
      templateColumns="repeat(2, 1fr)"
      rowGap={2}
    >
      <GridItem colSpan={1}>
        <Box display="flex" alignItems="center" className="space-x-2">
          <img className="w-8 h-8 rounded-lg border-inset" src={logo} />
          <Box>
            <Heading size="xs">Khoai Bistro</Heading>
            <Text fontSize="xs">Xin chào quý khách!</Text>
          </Box>
        </Box>
      </GridItem>
      <GridItem colSpan={1}>
        <TableInfo />
      </GridItem>
      <GridItem colSpan={2}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <ButtonGroup size="sm" isAttached variant="outline">
            <Button>Gọi nhân viên</Button>
            <Button>Gọi thanh toán</Button>
            <Button variant="solid" colorScheme="green">
              Nhắn tin Zalo
            </Button>
          </ButtonGroup>
        </Box>
      </GridItem>

      <GridItem colSpan={2}>
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
              <CloseButton size="sm" onClick={onExitSearchMode} />
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
