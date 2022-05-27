import React, { useState, useEffect } from "react";
import { Crypto, FIAT, Transaction, TransactionRaw } from "../@types";
import { TransactionAPI } from "../api/transactions";
import {
  Crypto as CryptoEnum,
  FIAT as FIATEnum,
  State,
  StateColor,
  StateType,
} from "../Enums";

export const useTransactions = () => {
  const [isLoading, setIsloading] = useState(true);
  const [transaction_data, setTransactionData] = useState<Transaction[]>([]);

  const removeTransaction = (transaction: Transaction) => {
    transaction_data.splice(
      transaction_data.findIndex((t: Transaction) => t === transaction),
      1
    );
  };

  const addNewTransaction = (transaction: TransactionRaw) => {
    const crypto: Crypto = {
      ...transaction.crypto,
      currency: (CryptoEnum as any)[transaction.crypto.currency],
    };
    const fiat: FIAT = {
      ...transaction.fiat,
      currency: (FIATEnum as any)[transaction.fiat.currency],
    };
    transaction_data.push({
      ...transaction,
      id: "123456",
      crypto: crypto,
      fiat: fiat,
      creationDate: new Date(),
      state: State.PS_RUNNING,
      stateColor: (StateColor as any)[StateType.PS_RUNNING],
      payDate: undefined,
    });
  };

  useEffect(() => {
    async function loadTransactionData() {
      setTransactionData(await TransactionAPI.loadTransaction());
      setIsloading(false);
    }

    loadTransactionData();
  }, []);

  return { transaction_data, isLoading, addNewTransaction, removeTransaction };
};
