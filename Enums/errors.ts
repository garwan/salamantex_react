export enum TransactionErrors {
  REQUIRED_PAID_TO_ID = "You must provide reciever address.",
  REQUIRED_AMOUNT = "You must provide amount",
  NOT_NULL = "Amount cannot be 0",
  MUST_BE_LONGER_THAN_6 = "Address must be at least 6 characters long",
}
