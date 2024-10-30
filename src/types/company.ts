import { CreateUpdateTrace } from "./common";

export interface Table extends CreateUpdateTrace {
  id: number;
  companyId: number;
  storeId: number;
  zoneId: number;
  name: string;
  description: string | null;
  seq: number;
  isActive: boolean;
}

export interface Store extends CreateUpdateTrace {
  id: number;
  companyId: number;
  companyName: string;
  companyAvatar: string;
  name: string;
  phone: string;
  address: string;
  provinceId: number;
  provinceName: string;
  districtId: number;
  districtName: string;
  wardId: number;
  wardName: string;
  isActive: boolean;
}
