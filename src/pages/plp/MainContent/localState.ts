import { RefObject, useEffect, useRef } from "react";
import { atom, useSetAtom } from "jotai";

export const plpMainContentAreaRefAtom = atom<RefObject<HTMLDivElement> | null>(
  null
);

export const usePlpMainContentAreaRef = () => {
  const ref = useRef<HTMLDivElement>(null);
  const setPlpMainContentAreaRef = useSetAtom(plpMainContentAreaRefAtom);

  useEffect(() => {
    setPlpMainContentAreaRef(ref);
  }, [ref]);

  return ref;
};
