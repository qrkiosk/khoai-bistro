import React, { FC, useMemo } from "react";
import { Text } from "zmp-ui";

import { Product } from "../types/product";
import { ProductPicker } from "../components/product/picker";
import { SelectedOptions } from "../types/cart";
import { calcFinalPrice } from "../utils/product";
import { FinalPrice } from "./display/final-price";

const ProductItem: FC<{ product: Product }> = ({ product }) => {
  return (
    <ProductPicker product={product}>
      {({ open }) => (
        <div className="space-y-2" onClick={open}>
          <div className="w-full aspect-square relative">
            <img
              loading="lazy"
              src={product.image}
              className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover object-center rounded-lg bg-skeleton"
            />
          </div>
          <Text>{product.name}</Text>
          <Text size="xxSmall" className="text-gray pb-2">
            <FinalPrice>{product}</FinalPrice>
          </Text>
        </div>
      )}
    </ProductPicker>
  );
};

export default ProductItem;
