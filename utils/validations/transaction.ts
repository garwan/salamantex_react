import { TransactionRaw } from "../../@types";
import { TransactionErrors } from "../../Enums";

export const validateTransaction = (
  transaction: TransactionRaw
): TransactionRaw => {
  let errors: any = {};

  if (!transaction.payedToId) {
    errors.payedToId = TransactionErrors.REQUIRED_PAID_TO_ID;
  } else if (transaction.payedToId && transaction.payedToId.length < 6) {
    errors.payedToId = TransactionErrors.MUST_BE_LONGER_THAN_6;
  } else {
    delete errors.payedToId;
  }

  if (!transaction.crypto.amount) {
    errors.crypto = { amount: TransactionErrors.REQUIRED_AMOUNT };
  } else if (transaction.crypto && Number(transaction.crypto.amount) === 0) {
    errors.crypto = { amount: TransactionErrors.NOT_NULL };
  } else {
    delete errors.crypto;
  }

  if (!transaction.fiat.amount) {
    errors.fiat = { amount: TransactionErrors.REQUIRED_AMOUNT };
  } else if (transaction.fiat && Number(transaction.fiat.amount) === 0) {
    errors.fiat = { amount: TransactionErrors.NOT_NULL };
  } else {
    delete errors.fiat;
  }

  return { ...transaction, errors: errors };
};
