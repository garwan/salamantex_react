import { useTransactions } from "../../hooks/useTransactions"
import TransactionBody from "./TransactionBody"
import TransactionHeader from "./TransactionHeader"

const Transaction = () => {

    const { transaction_data, isLoading } = useTransactions()

    return (
        <div >
            <TransactionHeader />
            <TransactionBody transactions={transaction_data} loading={isLoading} />
        </div>
    )
}

export default Transaction
