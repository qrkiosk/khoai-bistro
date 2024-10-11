import { CreateUpdateTrace } from "./common";

export interface StoreTable extends CreateUpdateTrace {
  id: number;
  companyId: number;
  storeId: number;
  zoneId: number;
  name: string;
  description: string | null;
  seq: number;
  isActive: boolean;
}
