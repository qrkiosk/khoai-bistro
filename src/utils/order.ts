import isEmpty from "lodash/isEmpty";

import { Cart } from "../types/cart";
import { Order, OrderDetail, OrderProductVariant } from "../types/order";
import { StoreTable } from "../types/company";
import { UserInfo } from "../types/user";
import { calcItemTotalAmount } from "./cart";

const buildOrderDetails = (cart: Cart): OrderDetail[] =>
  cart.items.map((item) => {
    const { price: productPrice, quantity } = item; // product base price (before discount)
    const price = productPrice - 0; // product final price (without extra options selected), equals productPrice for now
    const amount = calcItemTotalAmount({ ...item, price });
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
      price,
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
  table: StoreTable;
  customer: UserInfo;
  cart: Cart;
}): Order => ({
  companyId: table.companyId,
  storeId: table.storeId,
  tableId: table.id,
  tableName: table.name,
  note: "",
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
