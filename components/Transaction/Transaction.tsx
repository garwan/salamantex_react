import { useTransactions } from "../../hooks/useTransactions"
import TransactionBody from "./TransactionBody"
import TransactionHeader from "./TransactionHeader"

const Transaction = () => {

    const { transaction_data, isLoading, addNewTransaction, removeTransaction } = useTransactions()

    return (
        <div >
            <TransactionHeader addNewTransaction={addNewTransaction} removeTransaction={removeTransaction} />
            <TransactionBody transactions={transaction_data} loading={isLoading} />
        </div>
    )
}

export default Transaction
