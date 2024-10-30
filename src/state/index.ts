import { RefObject } from "react";
import { atom } from "jotai";
import { atomWithStorage, RESET } from "jotai/utils";
import { atomWithQuery } from "jotai-tanstack-query";
import isEmpty from "lodash/isEmpty";
import sortBy from "lodash/sortBy";

import { UserInfo } from "../types/user";
import { Store, StoreTable } from "../types/company";
import { Cart, CartProductVariant } from "../types/cart";
import {
  CategoryWithProducts,
  OptionDetail,
  ProductWithOptions,
} from "../types/product";
import { PaymentType } from "../types/payment";
import { ShippingType } from "../types/shipping";
import { OAMessageReqData } from "../types/order";
import { FuseWithDataSet, getFuseInstance } from "../utils/fuse";
import { getStoreTableById, getStoreById } from "../api/company";
import { getProductById, getStoreProductsByCategory } from "../api/product";

export const userInfoAtom = atomWithStorage<UserInfo | null>(
  "cachedUserInfo",
  null,
  undefined,
  { getOnInit: true }
);
export const isUserAuthorizedAtom = atom<boolean>(
  (get) => get(userInfoAtom) != null
);
export const userNameAtom = atom((get) => get(userInfoAtom)?.name);

export const tableIdAtom = atom<number | null>(null);
export const storeIdAtom = atom<number | null>(null);
export const companyIdAtom = atom<number | null>(null);

export const getSearchAtom = atom((get) => {
  const tableId = get(tableIdAtom);
  const storeId = get(storeIdAtom);
  const companyId = get(companyIdAtom);

  const searchParams = new URLSearchParams({
    tableId: (tableId ?? "").toString(),
    storeId: (storeId ?? "").toString(),
    companyId: (companyId ?? "").toString(),
  });

  return searchParams.toString();
});

export const setSearchParamIdsAtom = atom(null, (_get, set, search: string) => {
  const searchParams = new URLSearchParams(search);
  const tableId = searchParams.get("tableId");
  const storeId = searchParams.get("storeId");
  const companyId = searchParams.get("companyId");

  set(tableIdAtom, tableId ? +tableId : null);
  set(storeIdAtom, storeId ? +storeId : null);
  set(companyIdAtom, companyId ? +companyId : null);
});

export const tableInfoAtom = atomWithQuery<
  StoreTable | null,
  Error,
  StoreTable | null,
  [string, number | null]
>((get) => ({
  initialData: null,
  queryKey: ["table", get(tableIdAtom)],
  queryFn: async ({ queryKey: [, tableId] }) => {
    if (tableId == null) return null;

    const response = await getStoreTableById(tableId);
    return response.data.data;
  },
}));

export const storeInfoAtom = atomWithQuery<
  Store | null,
  Error,
  Store | null,
  [string, number | null]
>((get) => ({
  initialData: null,
  queryKey: ["store", get(storeIdAtom)],
  queryFn: async ({ queryKey: [, storeId] }) => {
    if (storeId == null) return null;

    const response = await getStoreById(storeId);
    return response.data.data;
  },
}));

// export const storeProductsAtom = atomWithQuery<
//   Product[],
//   Error,
//   Product[],
//   [string, number | null]
// >((get) => ({
//   initialData: [],
//   queryKey: ["product", get(storeIdAtom)],
//   queryFn: async ({ queryKey: [, storeId] }) => {
//     if (storeId == null) return [];

//     const response = await getStoreProducts({ storeId });
//     return response.data.data;
//   },
// }));

export const storeProductsByCategoryAtom = atomWithQuery<
  CategoryWithProducts[],
  Error,
  CategoryWithProducts[],
  [string, number | null, number | null]
>((get) => ({
  initialData: [],
  queryKey: ["product/category", get(storeIdAtom), get(companyIdAtom)],
  queryFn: async ({ queryKey: [, storeId, companyId] }) => {
    if (storeId == null || companyId == null) return [];

    const response = await getStoreProductsByCategory({ storeId, companyId });
    return response.data.data.filter(
      (category) => category.products.length > 0
    );
  },
}));

export const selectedProductIdAtom = atom<string | null>(null);

export const isEditingCartItemAtom = atom(false);

export const productDetailsAtom = atomWithQuery<
  ProductWithOptions | null,
  Error,
  ProductWithOptions,
  [string, string | null]
>((get) => ({
  staleTime: Infinity,
  queryKey: ["productDetails", get(selectedProductIdAtom)],
  queryFn: async ({ queryKey: [, selectedProductId] }) => {
    if (selectedProductId == null) return null;

    const response = await getProductById(selectedProductId);
    return response.data.data;
  },
}));

export const productVariantAtom = atom<CartProductVariant | null>(null);

export const productVariantQtyAtom = atom(
  (get) => get(productVariantAtom)?.quantity
);

export const productVariantNoteAtom = atom(
  (get) => get(productVariantAtom)?.note
);

export const productVariantPriceAtom = atom((get) => {
  const productVariant = get(productVariantAtom);
  if (productVariant == null) return 0;

  const quantity = productVariant.quantity;
  const basePrice = productVariant.priceSale;
  const optionsPrice = productVariant.options.reduce((acc, opt) => {
    const selectedDetailPrice = opt.selectedDetail?.price ?? 0;
    const selectedDetailsTotalAmount = opt.selectedDetails.reduce(
      (a, d) => a + d.price,
      0
    );
    return acc + selectedDetailPrice + selectedDetailsTotalAmount;
  }, 0);

  return (basePrice + optionsPrice) * quantity;
});

export const prepareProductVariantAtom = atom(
  null,
  (get, set, productDetails: ProductWithOptions) => {
    const productVariant = get(productVariantAtom);
    if (productVariant != null) return;

    set(productVariantAtom, {
      ...productDetails,
      uniqIdentifier: `${productDetails.id}--${Date.now()}`,
      options: productDetails.options.map((opt) =>
        opt.isMandatory
          ? {
              ...opt,
              selectedDetail: opt.details[0],
              selectedDetails: [],
            }
          : {
              ...opt,
              selectedDetail: null,
              selectedDetails: [],
            }
      ),
      quantity: 1,
    });
  }
);

export const updateProductVariantQtyAtom = atom(
  null,
  (get, set, action: "INC" | "DEC", minQty?: 0 | 1) => {
    const productVariant = get(productVariantAtom);
    if (productVariant == null) return;

    if (action === "INC") {
      set(productVariantAtom, {
        ...productVariant,
        quantity: productVariant.quantity + 1,
      });
    } else if (action === "DEC") {
      set(productVariantAtom, {
        ...productVariant,
        quantity: Math.max(minQty ?? 1, productVariant.quantity - 1),
      });
    }
  }
);

export const setVariantSelectedDetailAtom = atom(
  null,
  (get, set, targetOptionId: string, targetOptionDetailId: string) => {
    const productVariant = get(productVariantAtom);
    if (productVariant == null) return;

    const options = productVariant.options;
    const targetOption = options.find((opt) => opt.id === targetOptionId);
    if (targetOption == null) return;

    const newSelectedDetail = targetOption.details.find(
      (detail) => detail.id === targetOptionDetailId
    );
    if (newSelectedDetail == null) return;

    const newOptions = options.map((opt) =>
      opt.id === targetOptionId
        ? {
            ...opt,
            selectedDetail: { ...newSelectedDetail },
            selectedDetails: [],
          }
        : opt
    );
    set(productVariantAtom, { ...productVariant, options: newOptions });
  }
);

export const setVariantSelectedDetailsAtom = atom(
  null,
  (get, set, targetOptionId: string, targetOptionDetailIds: string[]) => {
    const productVariant = get(productVariantAtom);
    if (productVariant == null) return;

    const options = productVariant.options;
    const targetOption = options.find((opt) => opt.id === targetOptionId);
    if (targetOption == null) return;

    const targetOptionDetailIdsSet = new Set(targetOptionDetailIds);

    const newSelectedDetails = targetOption.details.reduce<OptionDetail[]>(
      (acc, detail) =>
        targetOptionDetailIdsSet.has(detail.id) ? [...acc, detail] : acc,
      []
    );
    const newOptions = productVariant.options.map((opt) =>
      opt.id === targetOptionId
        ? {
            ...opt,
            selectedDetail: null,
            selectedDetails: newSelectedDetails,
          }
        : opt
    );
    set(productVariantAtom, { ...productVariant, options: newOptions });
  }
);

export const setVariantNoteAtom = atom(null, (get, set, note: string) => {
  const productVariant = get(productVariantAtom);
  if (productVariant == null) return;

  set(productVariantAtom, { ...productVariant, note });
});

export const isCartDrawerOpenAtom = atom(false);

export const cartAtom = atomWithStorage<Cart>(
  "cachedCart",
  {
    items: [],
    payment: { paymentType: null },
    shipping: { shippingType: ShippingType.ON_SITE },
  },
  undefined,
  { getOnInit: true }
);

export const cartTotalQtyAtom = atom((get) => {
  const cart = get(cartAtom);
  return cart.items.reduce((acc, item) => acc + item.quantity, 0);
});

export const cartSubtotalAtom = atom((get) => {
  const cart = get(cartAtom);

  return cart.items.reduce((total, item) => {
    const quantity = item.quantity;
    const baseItemPrice = item.priceSale;
    const optionsPrice = item.options.reduce((acc, opt) => {
      const selectedDetailPrice = opt.selectedDetail?.price ?? 0;
      const selectedDetailsTotalAmount = opt.selectedDetails.reduce(
        (a, d) => a + d.price,
        0
      );

      return acc + selectedDetailPrice + selectedDetailsTotalAmount;
    }, 0);
    const itemPrice = (baseItemPrice + optionsPrice) * quantity;

    return total + itemPrice;
  }, 0);
});

export const addToCartAtom = atom(null, (get, set) => {
  const productVariant = get(productVariantAtom);
  if (productVariant == null) return;

  const cart = get(cartAtom);
  const isEditingCartItem = get(isEditingCartItemAtom);

  if (isEditingCartItem) {
    set(cartAtom, {
      ...cart,
      items: cart.items.map((item) =>
        item.uniqIdentifier === productVariant.uniqIdentifier
          ? { ...productVariant }
          : item
      ),
    });
  } else {
    set(cartAtom, {
      ...cart,
      items: cart.items.concat({
        ...productVariant,
        uniqIdentifier:
          productVariant.uniqIdentifier ??
          `${productVariant.id}--${Date.now()}`,
      }),
    });
  }
});

export const removeCartItemAtom = atom(
  null,
  (get, set, uniqIdentifier: string) => {
    const cart = get(cartAtom);

    set(cartAtom, {
      ...cart,
      items: cart.items.filter(
        (item) => item.uniqIdentifier !== uniqIdentifier
      ),
    });
  }
);

export const clearCartAtom = atom(null, (_get, set) => {
  set(cartAtom, RESET);
});

export const setPaymentTypeAtom = atom(
  null,
  (get, set, paymentType: string | PaymentType) => {
    const cart = get(cartAtom);
    set(cartAtom, {
      ...cart,
      payment: {
        ...cart.payment,
        paymentType: paymentType as PaymentType,
      },
    });
  }
);

export const setShippingTypeAtom = atom(
  null,
  (get, set, shippingType: string | ShippingType) => {
    const cart = get(cartAtom);
    set(cartAtom, {
      ...cart,
      shipping: {
        ...cart.shipping,
        shippingType: shippingType as ShippingType,
      },
    });
  }
);

export const searchQueryAtom = atom<string>("");
export const isSearchQueryEmptyAtom = atom((get) => !get(searchQueryAtom));

/* export const searchResultsAsyncAtom = atomWithQuery<
  CategoryWithProducts[],
  Error,
  CategoryWithProducts[],
  [string, number | null, string]
>((get) => ({
  initialData: [],
  queryKey: ["searchResults", get(storeIdAtom), get(searchQueryAtom)],
  queryFn: async ({ queryKey: [, storeId, searchQuery] }) => {
    if (storeId == null || !searchQuery) return [];

    const response = await getStoreProductsByCategory({
      storeId,
      name: searchQuery,
    });
    return response.data.data.filter(
      (category) => category.products.length > 0
    );
  },
})); */

export const fuseInstanceAtom = atomWithQuery<
  FuseWithDataSet | null,
  Error,
  FuseWithDataSet,
  [string, CategoryWithProducts[]]
>((get) => ({
  staleTime: Infinity,
  queryKey: ["fuseInstance", get(storeProductsByCategoryAtom).data],
  queryFn: ({ queryKey: [, dataSet] }) =>
    !isEmpty(dataSet) ? getFuseInstance(dataSet) : null,
}));

export const searchResultSyncAtom = atom<CategoryWithProducts[]>((get) => {
  const searchQuery = get(searchQueryAtom);
  const storeProducts = get(storeProductsByCategoryAtom).data;
  const fuse = get(fuseInstanceAtom).data;

  if (!searchQuery || fuse == null) return storeProducts;

  const searchResults = fuse.search(searchQuery).map((result) => result.item);
  return sortBy(searchResults, "seq");
});

export const categoryRefsMapAtom = atom<Map<string, RefObject<HTMLDivElement>>>(
  new Map()
);

export const setCategoryRefsMapAtom = atom(
  null,
  (get, _, key: string, val: RefObject<HTMLDivElement>) => {
    const refsMap = get(categoryRefsMapAtom);
    refsMap.set(key, val);
  }
);

export const categoryIdInViewAtom = atom<string | null>(null);

export const categoryNameInViewAtom = atom<string | null>((get) => {
  const storeProducts = get(storeProductsByCategoryAtom).data;
  const categoryIdInView = get(categoryIdInViewAtom);
  const category = storeProducts.find(
    (category) => category.id === categoryIdInView
  );
  return category?.name ?? "Tất cả danh mục";
});

export const oaMessageReqDataAtom = atom<OAMessageReqData | null>(null);

export const isHeaderShownAtom = atom(false);

export const mainContentRefAtom = atom<RefObject<HTMLDivElement> | null>(null);

export const headerRefAtom = atom<RefObject<HTMLDivElement> | null>(null);
