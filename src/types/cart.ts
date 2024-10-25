import { PaymentType } from "./payment";
import { ShippingType } from "./shipping";
import { BaseProductVariant } from "./product";

export interface CartProductVariant extends BaseProductVariant {
  uniqIdentifier: string;
  quantity: number;
  note?: string;
}

export interface Cart {
  items: CartProductVariant[];
  payment: {
    paymentType: PaymentType | null;
  };
  shipping: {
    shippingType: ShippingType;
  };
}
