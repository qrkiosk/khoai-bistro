import React, { useCallback } from "react";
import { useAtom, useAtomValue } from "jotai";
import { Header as ZHeader, Icon } from "zmp-ui";
import {
  Box,
  Button,
  CloseButton,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import logo from "../../../static/icons/logo.png";
import { categoryNameInViewAtom, userNameAtom } from "../../../state";
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

  return (
    <Grid
      templateRows={`repeat(2, 1fr)`}
      templateColumns="repeat(3, 1fr)"
      rowGap={2}
    >
      <GridItem colSpan={2}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" className="space-x-2">
            <Image className="w-10 h-10 rounded-lg border-inset" src={logo} />
            <Box>
              <Heading size="xs" fontWeight="semibold">
                {userName ? `Xin chào, ${userName}!` : "Xin chào quý khách!"}
              </Heading>
              <TableInfo />
            </Box>
          </Box>
        </Box>
      </GridItem>
      <GridItem colSpan={1}>
        {/* This col is for the mini app minimize button */}
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
