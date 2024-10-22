import { CartProductVariant } from "../types/cart";
import { OptionWithSelectedDetail } from "../types/product";

export const calcItemTotalAmount = (item: CartProductVariant) => {
  const quantity = item.quantity;
  const baseItemPrice = item.price;
  const optionsPrice = item.options.reduce((acc, opt) => {
    const selectedDetailPrice = opt.selectedDetail?.price ?? 0;
    const selectedDetailsTotalPrice = opt.selectedDetails.reduce(
      (a, d) => a + d.price,
      0
    );
    return acc + selectedDetailPrice + selectedDetailsTotalPrice;
  }, 0);

  return (baseItemPrice + optionsPrice) * quantity;
};

export const genMultiChoiceOptionDisplayText = (
  option: OptionWithSelectedDetail
) => option.selectedDetails.map((d) => d.name).join(",");
