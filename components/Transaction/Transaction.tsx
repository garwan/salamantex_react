import { useTransactions } from "../../hooks/useTransactions"
import TransactionBody from "./TransactionBody"
import TransactionHeader from "./TransactionHeader"

const Transaction = () => {

    const { transaction_data, isLoading, addNewTransaction, removeTransaction, reloadTransactions } = useTransactions()

    return (
        <div >
            <TransactionHeader addNewTransaction={addNewTransaction} />
            <TransactionBody reloadTransactions={reloadTransactions} transactions={transaction_data} loading={isLoading} removeTransaction={removeTransaction} />
        </div>
    )
}

export default Transaction
