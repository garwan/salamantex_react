// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { TransactionRaw } from "../../@types";
import transactionData from "../../data/transactions.json";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TransactionRaw[]>
) {
  res.status(200).json(transactionData);
}
