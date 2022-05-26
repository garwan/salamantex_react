import {
  FIAT as FIATEnum,
  Crypto as CryptoEnum,
  State as StateEnum,
} from "../Enums";

export type FIAT = {
  amount: string;
  currency: FIATEnum;
};

export type Crypto = {
  amount: string;
  currency: CryptoEnum;
};

export type Transaction = {
  id?: string;
  creationDate: Date | string;
  payDate?: Date;
  state: StateEnum;
  payedToId: string;
  fiat: FIAT;
  crypto: Crypto;
  stateColor?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
};

export type CryptoRaw = {
  amount: string;
  currency: CryptoEnum;
};

export type FIATRaw = {
  amount: string;
  currency: FIATEnum;
};

export type TransactionRaw = {
  id: string;
  creationDate: string;
  payDate?: string;
  state: string;
  payedToId: string;
  fiat: FIATRaw;
  crypto: CryptoRaw;
};
