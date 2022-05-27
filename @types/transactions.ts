import { FIATType, CryptoType, State as StateEnum } from "../Enums";

export type FIAT = {
  amount: string;
  currency: FIATType;
};

export type Crypto = {
  amount: string;
  currency: CryptoType;
};

export type Transaction = {
  id?: string;
  creationDate: Date;
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
  currency: CryptoType;
};

export type FIATRaw = {
  amount: string;
  currency: FIATType;
};

export type TransactionRaw = {
  id?: string;
  creationDate: string;
  payDate?: string;
  state: string;
  payedToId: string;
  fiat: FIATRaw;
  crypto: CryptoRaw;
};
