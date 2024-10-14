import { atomEffect } from "jotai-effect";

import { companyIdAtom, storeIdAtom, tableIdAtom } from ".";

export const searchParamIdsQueryEffect = atomEffect((_, set) => {
  const searchParams = new URLSearchParams(window.location.search);
  const tableId = searchParams.get("tableId");
  const storeId = searchParams.get("storeId");
  const companyId = searchParams.get("companyId");

  set(tableIdAtom, tableId ? +tableId : null);
  set(storeIdAtom, storeId ? +storeId : null);
  set(companyIdAtom, companyId ? +companyId : null);
});
