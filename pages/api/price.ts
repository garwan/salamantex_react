// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import priceData from "../../data/prices.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let {
    query: { crypto_symbol: crypto_symbol_raw, fiat_symbol: fiat_symbol_raw },
  } = req;

  let crypto_symbol: string = "";
  let fiat_symbol: string = "";

  if (typeof crypto_symbol_raw !== "string") {
    crypto_symbol = crypto_symbol_raw.toString();
  }

  if (typeof fiat_symbol_raw !== "string") {
    fiat_symbol = fiat_symbol_raw.toString();
  }

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
      console.log("error", error);
      return res.status(500).send(JSON.stringify(priceData));
    });
}
