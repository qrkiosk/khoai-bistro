import Fuse from "fuse.js";

import { CategoryWithProducts } from "../types/product";

export type FuseWithDataSet = Fuse<CategoryWithProducts>;

const SEARCH_OPTIONS = {
  includeScore: true,
  includeMatches: true,
  shouldSort: true,
  threshold: 0.5,
  keys: [
    { name: "products.name", weight: 3 },
    { name: "name", weight: 2 },
    { name: "products.description", weight: 1 },
  ],
};

export const getFuseInstance = (dataSet: ReadonlyArray<CategoryWithProducts>) =>
  new Fuse(dataSet, SEARCH_OPTIONS);
