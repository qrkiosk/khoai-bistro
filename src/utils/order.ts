import isEmpty from "lodash/isEmpty";

import { Cart } from "../types/cart";
import { Table } from "../types/company";
import { Order, OrderDetail, OrderProductVariant } from "../types/order";
import { UserInfo } from "../types/user";
import { calcItemTotalAmount } from "./cart";

const buildOrderDetails = (cart: Cart): OrderDetail[] =>
  cart.items.map((item) => {
    const { priceSale: productPrice, quantity } = item; // base price (before discount)
    const discountedPrice = productPrice - 0; // final price (discounted, without including extra options) - equals productPrice for now
    const amount = calcItemTotalAmount({ ...item, priceSale: discountedPrice });
    const totalAmount = amount;

    const variants = item.options.reduce<OrderProductVariant[]>((acc, opt) => {
      if (!isEmpty(opt.selectedDetail)) {
        const variantOfOption = {
          productVariantId: opt.selectedDetail.productVariantId,
          productOptionId: opt.id,
          poName: opt.name,
          productOptionDetailId: opt.selectedDetail.id,
          podName: opt.selectedDetail.name,
          podPrice: opt.selectedDetail.price,
        };

        return [...acc, variantOfOption];
      }

      if (!isEmpty(opt.selectedDetails)) {
        const variantsOfOption = opt.selectedDetails.map((dtl) => ({
          productVariantId: dtl.productVariantId,
          productOptionId: opt.id,
          poName: opt.name,
          productOptionDetailId: dtl.id,
          podName: dtl.name,
          podPrice: dtl.price,
        }));

        return [...acc, ...variantsOfOption];
      }

      return acc;
    }, []);

    return {
      productId: item.id,
      productName: item.name,
      productPrice,
      quantity,
      price: discountedPrice,
      amount,
      totalAmount,
      note: item.note ?? "",
      variants,
    };
  });

export const buildOrder = ({
  table,
  customer,
  cart,
}: {
  table: Table;
  customer: UserInfo;
  cart: Cart;
}): Order => ({
  companyId: table.companyId,
  storeId: table.storeId,
  tableId: table.id,
  tableName: table.name,
  note: "",
  discountAmount: 0, // promotion application to be implemented in the future
  discountPercentage: 0, // promotion application to be implemented in the future
  discountVoucher: 0, // promotion application to be implemented in the future
  paymentType: cart.payment.paymentType,
  sourceType: cart.shipping.shippingType,
  customer,
  details: buildOrderDetails(cart),
});

export const genErrorToast = (opts: {
  title: string;
  description: string;
}) => ({
  ...opts,
  status: "error" as const,
  duration: 8000,
  isClosable: true,
});
