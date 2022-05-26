import { Transaction } from "../../../@types";
import TransactionBodyDesktop from "./TransactionBodyDesktop";

type TransactionBody = {
    transactions: Transaction[]
    loading: boolean
}
const TransactionBody = ({ transactions, loading }: TransactionBody) => {
    return (
        <TransactionBodyDesktop transactions={transactions} loading={loading} />
    )
}

export default TransactionBody
