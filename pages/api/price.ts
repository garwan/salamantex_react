// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import priceData from "../../data/prices.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const crypto_symbol_raw = req.query.crypto_symbol;
  const fiat_symbol_raw = req.query.fiat_symbol;

  let crypto_symbol: string =
    typeof crypto_symbol_raw !== "string"
      ? crypto_symbol_raw.toString()
      : crypto_symbol_raw;

  let fiat_symbol: string =
    typeof fiat_symbol_raw !== "string"
      ? fiat_symbol_raw.toString()
      : fiat_symbol_raw;

  let prices: any = [];
  prices = priceData;

  return await fetch(
    `https://www.blockchain.com/prices/api/coin-data?fsym=${crypto_symbol}&tsym=${fiat_symbol}`,
    {
      mode: "no-cors",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const newPrice = { price: data.Data.AggregatedData.PRICE };

      if (!prices[crypto_symbol]) {
        prices[crypto_symbol] = {};
        prices[crypto_symbol][fiat_symbol] = newPrice;
      } else {
        prices[crypto_symbol][fiat_symbol] = newPrice;
      }

      const fs = require("fs");
      fs.writeFile("../../data/prices.json", JSON.stringify(prices), () => {});

      return res.status(200).json({ prices: prices });
    })
    .catch((error) => {
      return res.status(500).send(JSON.stringify(priceData));
    });
}
