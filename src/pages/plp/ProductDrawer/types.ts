export type ProductOption = {
  id: number;
  name: string;
  seq: number;
  isMandatory: boolean;
  isMany: boolean;
  details: Array<{
    id: number;
    name: string;
    price: number;
    seq: number;
    productVariantId: number;
  }>;
};

// export type ProductOption = {
//   companyId: number | null;
//   storeId: number | null;
//   totalPages: number | null;
//   page: number | null;
//   pageSize: number | null;
//   createdBy: unknown;
//   createdById: unknown;
//   createdAt: string;
//   updatedBy: unknown;
//   updatedById: unknown;
//   updatedAt: string;
//   id: string;
//   name: string;
//   price: number;
//   isActive: boolean;
//   productOptionId: string;
//   productVariantId: string;
// };

// type ProductDetails = {
//   id: number;
//   name: string;
//   price: number;
//   description: string;
//   productOptions: ProductOption[];
// };

export type ProductDetails = {
  id: number;
  name: string;
  price: number;
  description: string;
  options: ProductOption[];
};
