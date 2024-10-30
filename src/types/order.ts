import { AsyncCallbackFailObject, CheckTransactionReturns } from "zmp-sdk";

import { CreateUpdateTrace } from "./common";
import { PaymentType } from "./payment";
import { ShippingType } from "./shipping";
import { UserInfo } from "./user";

export interface Order {
  companyId: number;
  storeId: number;
  customer: UserInfo;
  paymentType: PaymentType | null;
  sourceType: ShippingType;
  tableId: number;
  tableName: string;
  note: string;
  details: OrderDetail[];
}

export interface OrderDetail {
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  price: number;
  amount: number;
  totalAmount: number;
  note: string;
  variants: OrderProductVariant[];
}

export interface OrderProductVariant {
  productVariantId: string;
  productOptionId: string;
  poName: string;
  productOptionDetailId: string;
  podName: string;
  podPrice: number;
}

export interface MerchantSideOrder extends CreateUpdateTrace {
  id: string;
  companyId: number;
  storeId: number;
  totalPages: 0;
  page: 0;
  pageSize: 0;
  code: string;
  orderAt: null;
  shiftId: null;
  shiftCode: null;
  shiftEmployeeId: null;
  tableId: number;
  tableName: string;
  paymentType: PaymentType | null;
  sourceType: "ON_SITE";
  amount: number;
  taxAmount: number;
  discountAmount: number;
  discountPercentage: number;
  discountVoucher: number;
  deliveryFee: number;
  serviceFee: number;
  totalAmount: number;
  totalQuantity: number;
  status: null;
  isActive: boolean;
  note: ""; // not used, always empty
  mac: string;
  details: Array<{
    id: string;
    productId: string;
    productName: string;
    productPrice: number;
    quantity: number;
    price: number;
    amount: number;
    tax: number;
    taxAmount: number;
    discountAmount: number;
    discountPercentage: number;
    discountVoucher: number;
    totalAmount: number;
    isActive: boolean;
    note: string;
  }>;
}

export interface OAMessageReqData {
  customerId: string;
  customerName: string;
  tableName: string;
  quantity: number;
  totalAmount: number;
  orderId: string;
  orderCode: string;
  accessTokenApp: string;
  companyId: number;
  storeId: number;
}
