import React, { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { Box } from "@chakra-ui/react";

import { searchQueryAtom, searchResultSyncAtom } from "../../../state";
import Divider from "../../../components/Divider";
import ProductList from "./ProductList";

const SearchResult = () => {
  const ref = useRef<HTMLDivElement>(null);
  const searchResult = useAtomValue(searchResultSyncAtom);
  const searchQuery = useAtomValue(searchQueryAtom);

  useEffect(() => {
    if (searchQuery) ref.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [searchQuery]);

  return (
    <Box
      ref={ref}
      display={searchQuery ? "block" : "none"}
      overflowY="auto"
      h="100%"
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
