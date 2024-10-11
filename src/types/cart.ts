import { CartProductVariant } from "./product";

export type SelectedOptions = Record<string, string | string[]>;

export type Cart = {
  items: CartProductVariant[];
  shippingInfo: Record<string, string> | null;
  paymentMethod: string | null;
};
