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
import { generateTransactionId } from "../utils/helpers";

export const useTransactions = () => {
  const [isLoading, setIsloading] = useState(true);
  const [transaction_data, setTransactionData] = useState<Transaction[]>([]);
  const [reloadTransactions, setReloadTransactions] = useState(false);

  const removeTransaction = (transaction: Transaction) => {
    transaction_data.splice(
      transaction_data.findIndex((t: Transaction) => t === transaction),
      1
    );
    setReloadTransactions((old) => !old);
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
      id: generateTransactionId(),
      crypto: crypto,
      fiat: fiat,
      creationDate: new Date(),
      state: State.PS_RUNNING,
      stateColor: (StateColor as any)[StateType.PS_RUNNING],
      payDate: undefined,
    });
    setReloadTransactions((old) => !old);
  };

  useEffect(() => {
    async function loadTransactionData() {
      setTransactionData(await TransactionAPI.loadTransaction());
      setIsloading(false);
    }

    loadTransactionData();
  }, []);

  return {
    transaction_data,
    isLoading,
    addNewTransaction,
    removeTransaction,
    reloadTransactions,
  };
};
