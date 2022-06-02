import React, { useState } from "react";
import { PriceAPI } from "../api/prices";
import { CryptoSymbol, CryptoType, FIATSymbol, FIATType } from "../Enums";
import priceData from "../data/prices.json";
import { formatNumber } from "../utils/helpers";
import { CryptoRaw, FIATRaw } from "../@types";

type Price = {
  price: string;
};

type FIATPrice = Record<string, Price>;

export type CryptoToFiat = Record<string, FIATPrice>;

type loadPrice = {
  crypto: string;
  fiat: string;
};

type calcFiatPrice = {
  crypto: string;
  fiat: string;
  amount: number | string;
};

export const usePrices = () => {
  const [isLoading, setIsloading] = useState(false);
  const [prices, setPrices] = useState<CryptoToFiat>(priceData);

  const loadPrice = async ({ crypto, fiat }: loadPrice) => {
    if (fiat && crypto) {
      setIsloading(true);
      const newPrices = await PriceAPI.loadPrice({ crypto, fiat });
      setPrices(newPrices.prices);
      setIsloading(false);
    }
  };

  const calcFiatPrice = ({ crypto, fiat, amount }: calcFiatPrice) => {
    const crypto_symbol = (CryptoSymbol as any)[
      crypto as unknown as CryptoType
    ];
    const fiat_symbol = (FIATSymbol as any)[fiat as unknown as FIATType];

    if (!prices[crypto_symbol] || !prices[crypto_symbol][fiat_symbol]) {
      return formatNumber(Number(amount));
    }
    const { price } = prices[crypto_symbol][fiat_symbol] ?? 1;
    return formatNumber(Number(amount) * Number(price));
  };

  const calcCryptoPrice = ({ crypto, fiat, amount }: calcFiatPrice) => {
    const crypto_symbol = (CryptoSymbol as any)[
      crypto as unknown as CryptoType
    ];
    const fiat_symbol = (FIATSymbol as any)[fiat as unknown as FIATType];
    if (!prices[crypto_symbol] || !prices[crypto_symbol][fiat_symbol]) {
      return formatNumber(Number(amount));
    }
    const { price } = prices[crypto_symbol][fiat_symbol] ?? 1;
    return formatNumber(Number(amount) / Number(price));
  };

  return { prices, isLoading, loadPrice, calcCryptoPrice, calcFiatPrice };
};
