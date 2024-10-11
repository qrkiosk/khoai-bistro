import { ProductOption, ProductDetails } from "./types";

export const SAMPLE_PRODUCT_OPTIONS: ProductOption[] = [
  {
    id: 1,
    name: "Size",
    seq: 1,
    isMandatory: true,
    isMany: false,
    details: [
      {
        id: 2,
        name: "M",
        price: 0,
        seq: 1,
        productVariantId: 12340,
      },
      {
        id: 3,
        name: "L",
        price: 5000,
        seq: 2,
        productVariantId: 12341,
      },
    ],
  },
  {
    id: 4,
    name: "Topping",
    seq: 2,
    isMandatory: false,
    isMany: true,
    details: [
      {
        id: 5,
        name: "Trân châu trắng",
        price: 5000,
        seq: 1,
        productVariantId: 12340,
      },
      {
        id: 6,
        name: "Kem muối",
        price: 7000,
        seq: 3,
        productVariantId: 12341,
      },
      {
        id: 7,
        name: "Pudding",
        price: 10000,
        seq: 2,
        productVariantId: 12341,
      },
    ],
  },
];

export const SAMPLE_PRODUCT_DETAILS: ProductDetails = {
  id: 123,
  name: "Cà phê sữa đá",
  price: 25000,
  description: "Cà phê nguyên bản cũng sữa đặc, sữa tươi hoà quyện.",
  options: SAMPLE_PRODUCT_OPTIONS,
};
