import { Transaction } from "../../../@types";
import TransactionBodyDesktop from "./TransactionBodyDesktop";

type TransactionBody = {
    transactions: Transaction[]
    loading: boolean
    removeTransaction: (t: Transaction) => void
    reloadTransactions: boolean
}
const TransactionBody = ({ reloadTransactions, transactions, loading, removeTransaction }: TransactionBody) => {
    return (
        <TransactionBodyDesktop reloadTransactions={reloadTransactions} transactions={transactions} loading={loading} removeTransaction={removeTransaction} />
    )
}

export default TransactionBody
