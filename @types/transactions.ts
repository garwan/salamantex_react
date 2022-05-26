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
  id: string;
  creationDate: Date;
  payDate: Date;
  state: StateEnum;
  payedToId: string;
  fiat: FIAT;
  crypto: Crypto;
};
