import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { atomWithQuery } from "jotai-tanstack-query";

import { StoreTable } from "../types/company";
import { getStoreTableById } from "../api/table";
import {
  getProductById,
  getStoreProducts,
  getStoreProductsByCategory,
} from "../api/product";
import { Cart } from "../types/cart";
import {
  CategoryWithProducts,
  OptionDetail,
  Product,
  CartProductVariant,
  ProductWithOptions,
} from "../types/product";

export const tableIdAtom = atom<number | null>(null);

export const tableIdQuery = atom(null, (_, set) => {
  const searchParams = new URLSearchParams(window.location.search);
  const tableId = searchParams.get("tableId");

  set(tableIdAtom, tableId ? +tableId : null);
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
    if (!tableId) return null;

    const response = await getStoreTableById(tableId);
    return response.data.data;
  },
}));

export const storeIdAtom = atom<number | null>(null);

export const storeIdQuery = atom(null, (_get, set) => {
  const searchParams = new URLSearchParams(window.location.search);
  const storeId = searchParams.get("storeId");

  set(storeIdAtom, storeId ? +storeId : null);
});

export const companyIdAtom = atom<number | null>(null);

export const companyIdQuery = atom(null, (_get, set) => {
  const searchParams = new URLSearchParams(window.location.search);
  const companyId = searchParams.get("companyId");

  set(companyIdAtom, companyId ? +companyId : null);
});

export const storeProductsAtom = atomWithQuery<
  Product[],
  Error,
  Product[],
  [string, number | null]
>((get) => ({
  initialData: [],
  queryKey: ["product", get(storeIdAtom)],
  queryFn: async ({ queryKey: [, storeId] }) => {
    if (!storeId) return [];

    const response = await getStoreProducts({ storeId });
    return response.data.data;
  },
}));

export const storeProductsByCategoryAtom = atomWithQuery<
  CategoryWithProducts[],
  Error,
  CategoryWithProducts[],
  [string, number | null]
>((get) => ({
  initialData: [],
  queryKey: ["product/category", get(storeIdAtom)],
  queryFn: async ({ queryKey: [, storeId] }) => {
    if (!storeId) return [];

    const response = await getStoreProductsByCategory({ storeId });
    return response.data.data;
  },
}));

export const selectedProductIdAtom = atom<string | null>(null);

export const isEditingCartItemAtom = atom(false);

export const productDetailsAtom = atomWithQuery<
  ProductWithOptions | null,
  Error,
  ProductWithOptions | null,
  [string, string | null]
>((get) => ({
  initialData: null,
  queryKey: ["productDetails", get(selectedProductIdAtom)],
  queryFn: async ({ queryKey: [, selectedProductId] }) => {
    if (!selectedProductId) return null;

    const response = await getProductById(selectedProductId);
    return response.data.data;
  },
}));

export const productVariantAtom = atom<CartProductVariant | null>(null);

export const productVariantQtyAtom = atom(
  (get) => get(productVariantAtom)?.quantity
);

export const productVariantPriceAtom = atom((get) => {
  const productVariant = get(productVariantAtom);
  if (productVariant == null) return 0;

  const quantity = productVariant.quantity;
  const basePrice = productVariant.price;
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
  (get, set, action: "INC" | "DEC") => {
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
        quantity: Math.max(1, productVariant.quantity - 1),
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

export const cartAtom = atomWithStorage<Cart>(
  "cachedCart",
  { items: [], shippingInfo: null, paymentMethod: null },
  undefined,
  { getOnInit: true }
);

export const cartSubtotalAtom = atom((get) => {
  const cart = get(cartAtom);

  return cart.items.reduce((total, item) => {
    const quantity = item.quantity;
    const baseItemPrice = item.price;
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
