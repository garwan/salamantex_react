import React, { useState, useEffect } from "react";
import { Transaction } from "../@types";
import { TransactionAPI } from "../api/transactions";
import { State } from "../Enums";

export const useTransactions = () => {
  const [isLoading, setIsloading] = useState(true);
  const [transaction_data, setTransactionData] = useState<Transaction[]>([]);

  const removeTransaction = (transaction: Transaction) => {
    transaction_data.splice(
      transaction_data.findIndex((t: Transaction) => t === transaction),
      1
    );
  };

  const addNewTransaction = (transaction: Transaction) => {
    transaction_data.push({
      ...transaction,
      creationDate: new Date().toISOString(),
      state: State.PS_RUNNING,
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
