import { Transaction, TransactionRaw } from "../@types";
import { FIAT, State, Crypto, StateColor } from "../Enums";

export const TransactionAPI = {
  loadTransaction: async () => {
    const rawData = await fetch(`http://localhost:3000/api/transactions`).then(
      (response) => response.json()
    );

    const transaction_data: Transaction[] = [];

    rawData.map((transaction: TransactionRaw) => {
      transaction_data.push({
        ...transaction,
        state: (State as any)[transaction.state],
        fiat: {
          ...transaction.fiat,
          currency: (FIAT as any)[transaction.fiat.currency],
        },
        crypto: {
          ...transaction.crypto,
          currency: (Crypto as any)[transaction.crypto.currency],
        },
        creationDate: new Date(transaction.creationDate),
        payDate: transaction.payDate
          ? new Date(transaction.payDate)
          : undefined,
        stateColor: (StateColor as any)[transaction.state],
      });
    });

    return transaction_data;
  },
};
