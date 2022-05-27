import { CryptoSymbol, FIATSymbol, CryptoType, FIATType } from "../Enums";

type loadPrice = {
  crypto: CryptoType;
  fiat: FIATType;
};
export const PriceAPI = {
  loadPrice: async ({ crypto, fiat }: loadPrice) => {
    const crypto_symbol = (CryptoSymbol as any)[crypto];
    const fiat_symbol = (FIATSymbol as any)[fiat];

    const rawData = await fetch(
      `http://localhost:3000/api/price?crypto_symbol=${crypto_symbol}&fiat_symbol=${fiat_symbol}`
    ).then((response) => response.json());

    return rawData;
  },
};
