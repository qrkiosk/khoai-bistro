import { Location } from "react-router";

export enum PaymentType {
  COD = "COD",
  BANK = "BANK",
  MOMO_SANDBOX = "MOMO_SANDBOX",
  MOMO = "MOMO",
}

export enum PaymentResultCode {
  SUCCESS = 1,
  PENDING = 0,
  FAILED = -1,
}

export interface State {
  path?: string;
  data?: string | Record<string, string>;
  redirectSearch: string;
}

export type ResultPageLocation = Location<State>;
