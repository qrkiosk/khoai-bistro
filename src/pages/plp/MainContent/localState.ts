import { RefObject, useEffect, useRef } from "react";
import { atom, useSetAtom } from "jotai";

export const mainContentRefAtom = atom<RefObject<HTMLDivElement> | null>(null);

export const usePlpMainContentAreaRef = () => {
  const ref = useRef<HTMLDivElement>(null);
  const setMainContentRef = useSetAtom(mainContentRefAtom);

  useEffect(() => {
    setMainContentRef(ref);
  }, [ref]);

  return ref;
};
