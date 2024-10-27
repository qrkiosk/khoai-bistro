import React, { useEffect, useMemo, useRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { Header as ZHeader } from "zmp-ui";

import {
  headerRefAtom,
  isHeaderShownAtom,
  isSearchQueryEmptyAtom,
} from "../../../state";
import HeaderContent from "./HeaderContent";

const Header = () => {
  const ref = useRef<HTMLDivElement>(null);
  const setHeaderRef = useSetAtom(headerRefAtom);
  useEffect(() => {
    setHeaderRef(ref);
  }, [ref]);

  const isHeaderShown = useAtomValue(isHeaderShownAtom);
  const isSearchQueryEmpty = useAtomValue(isSearchQueryEmptyAtom);
  const headerStyles = useMemo<React.CSSProperties>(() => {
    const common = {
      top: 0,
      left: 0,
      right: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,
      height: "auto",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "visibility 0.3s linear,opacity 0.3s linear",
    };

    if (isSearchQueryEmpty) {
      return {
        ...common,
        position: "absolute",
        visibility: isHeaderShown ? "visible" : "hidden",
        opacity: isHeaderShown ? 1 : 0,
      };
    }

    return {
      ...common,
      position: "sticky",
      visibility: "visible",
      opacity: 1,
    };
  }, [isSearchQueryEmpty, isHeaderShown]);

  return (
    <ZHeader
      ref={ref}
      showBackIcon={false}
      title={(<HeaderContent />) as unknown as string}
      className="safe-area-top"
      style={headerStyles}
    />
  );
};

export default Header;
