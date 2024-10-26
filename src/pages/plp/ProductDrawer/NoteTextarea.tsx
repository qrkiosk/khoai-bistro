import React, { useEffect, useRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { Textarea } from "@chakra-ui/react";
import autosize from "autosize";

import { productVariantNoteAtom, setVariantNoteAtom } from "../../../state";

const NoteTextarea = () => {
  const variantNote = useAtomValue(productVariantNoteAtom);
  const setVariantNote = useSetAtom(setVariantNoteAtom);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    autosize(ref.current);

    return () => {
      autosize.destroy(ref.current);
    };
  }, []);

  return (
    <Textarea
      ref={ref}
      rows={1}
      size="sm"
      transition="height none" // important for autosize to work properly
      placeholder="Thêm lưu ý của bạn về món này."
      borderRadius="md"
      mb={5}
      value={variantNote}
      onChange={(e) => setVariantNote(e.target.value)}
    />
  );
};

export default NoteTextarea;
