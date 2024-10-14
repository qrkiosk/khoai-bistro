import { useCallback, useEffect, useMemo } from "react";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import debounce from "lodash/debounce";

import { searchQueryAtom, isInSearchModeAtom } from "../../../state";

export const inputAtom = atom("");

export const useSearchMode = () => {
  const [isInSearchMode, setIsInSearchMode] = useAtom(isInSearchModeAtom);
  const onEnter = useCallback(() => setIsInSearchMode(true), []);
  const onExit = useCallback(() => setIsInSearchMode(false), []);

  return { isInSearchMode, onEnter, onExit };
};

export const useDebouncedSearchQueryUpdate = () => {
  const input = useAtomValue(inputAtom);
  const setSearchQuery = useSetAtom(searchQueryAtom);
  const setSearchQueryDebounced = useMemo(
    () => debounce(setSearchQuery, 500),
    []
  );

  useEffect(() => {
    setSearchQueryDebounced(input.trim());
  }, [input]);
};
