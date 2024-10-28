import React, { useCallback } from "react";
import { useAtom, useAtomValue } from "jotai";
import { Icon } from "zmp-ui";
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
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

import {
  categoryNameInViewAtom,
  storeInfoAtom,
  userNameAtom,
} from "../../../state";
import { useDelayedRender, useIsLoadedTableOrStore } from "../../../hooks";
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
  const { data: storeInfo } = useAtomValue(storeInfoAtom);
  const isLoadedTableOrStore = useIsLoadedTableOrStore();
  const showCategoryNameInView = useDelayedRender(800);

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
        <Box pl={2.5} className="flex items-center w-full space-x-2">
          <SkeletonCircle size="10" isLoaded={isLoadedTableOrStore}>
            <Image
              className="w-10 h-10 rounded-lg border-inset"
              src={storeInfo?.companyAvatar}
            />
          </SkeletonCircle>
          <SkeletonText
            noOfLines={2}
            skeletonHeight="2"
            textAlign="left"
            w="75%"
            mt={2}
            isLoaded={isLoadedTableOrStore}
          >
            <Heading size="xs" fontWeight="semibold">
              {userName ? `Xin chào, ${userName}!` : "Xin chào quý khách!"}
            </Heading>
            <TableInfo />
          </SkeletonText>
        </Box>
      </GridItem>
      <GridItem colSpan={1}>
        {/* This col is for the mini app minimize button */}
      </GridItem>

      <GridItem colSpan={3}>
        {isInSearchMode ? (
          <InputGroup size="sm" px={2.5}>
            <Input
              autoFocus
              placeholder="Nhập từ khoá"
              borderRadius="md"
              value={input}
              onChange={onChangeInput}
            />
            <InputRightElement right="10px">
              <CloseButton
                size="sm"
                _hover={{ bg: "none" }}
                onClick={onExitSearchMode}
              />
            </InputRightElement>
          </InputGroup>
        ) : (
          <Box
            display="flex"
            alignItems="center"
            className="space-x-2"
            px={2.5}
          >
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
                <SkeletonText
                  noOfLines={1}
                  skeletonHeight="2"
                  textAlign="left"
                  w="60%"
                  isLoaded={showCategoryNameInView}
                >
                  {categoryNameInView}
                </SkeletonText>
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

export default HeaderContent;
