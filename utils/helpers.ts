export const formatNumber = (value: number): string => {
  return value.toFixed(6).toString();
};

export const generateTransactionId = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "5";
  const transactionIdLength = 23;

  const charactersLength = characters.length;

  for (let i = 0; i < transactionIdLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
