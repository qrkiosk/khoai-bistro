import React, { useEffect } from "react";
import { useAtomValue } from "jotai";
import { Box } from "@chakra-ui/react";

import { searchQueryAtom, searchResultSyncAtom } from "../../../state";
import Divider from "../../../components/Divider";
import { mainContentRefAtom } from "./localState";
import ProductList from "./ProductList";

const SearchResult = () => {
  const mainContentRef = useAtomValue(mainContentRefAtom);
  const searchResult = useAtomValue(searchResultSyncAtom);
  const searchQuery = useAtomValue(searchQueryAtom);

  useEffect(() => {
    mainContentRef?.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [searchQuery]);

  return (
    <Box
      display={searchQuery ? undefined : "none"}
      bgColor="var(--zmp-background-color)"
      position="absolute"
      top={0}
      right={0}
      bottom={0}
      left={0}
    >
      {searchResult.map((category) => (
        <Box key={category.id}>
          <ProductList category={category} />
          <Divider />
        </Box>
      ))}
    </Box>
  );
};

export default SearchResult;
