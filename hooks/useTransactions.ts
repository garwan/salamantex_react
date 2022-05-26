import React, { useState, useEffect } from "react";
import { Transaction } from "../@types";
import { TransactionAPI } from "../api/transactions";

export const useTransactions = () => {
  const [isLoading, setIsloading] = useState(false);
  const [transaction_data, setTransactionData] = useState<Transaction[]>([]);

  useEffect(() => {
    async function loadTransactionData() {
      setTransactionData(await TransactionAPI.loadTransaction());
    }

    loadTransactionData();
  }, []);

  return { transaction_data, isLoading };
};
