import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { TransactionRaw } from "../../../@types"
import { usePrices } from "../../../hooks/usePrices"
import TransactionFormCrypto from "./TransactionFormCrypto"
import TransactionFormFiat from "./TransactionFormFiat"
import TransactionFormPaidTo from "./TransactionFormPaidTo"

type TransactionHeader = {
    transaction: TransactionRaw
    setTransaction: Dispatch<SetStateAction<TransactionRaw>>
}
const TransactionForm = ({ transaction, setTransaction }: TransactionHeader) => {

    const [exchangeFiat, setExchangeFiat] = useState(false)
    const [recalculate, setRecalculate] = useState(false)
    const { loadPrice, calcFiatPrice, calcCryptoPrice } = usePrices()

    useEffect(() => {
        const handleLoadPrice = async () => {
            await loadPrice({
                crypto: transaction.crypto.currency,
                fiat: transaction.fiat.currency
            })
        }
        handleLoadPrice()
    }, [
        transaction.crypto.currency,
        transaction.fiat.currency
    ])

    const calculateFiat = () => {
        return {
            ...transaction, fiat: {
                ...transaction.fiat,
                amount: calcFiatPrice({
                    crypto: transaction.crypto.currency,
                    fiat: transaction.fiat.currency,
                    amount: transaction.crypto.amount
                })
            }
        }
    }

    const calculateCrypto = () => {
        return {
            ...transaction, crypto: {
                ...transaction.crypto,
                amount: calcCryptoPrice({
                    crypto: transaction.crypto.currency,
                    fiat: transaction.fiat.currency,
                    amount: transaction.fiat.amount
                })
            }
        }
    }

    useEffect(() => {
        if (!exchangeFiat) {
            setTransaction(calculateCrypto())
        }
    }, [transaction.fiat.amount])

    useEffect(() => {
        if (exchangeFiat) {
            setTransaction(calculateFiat())
        }
    }, [transaction.crypto.amount])

    useEffect(() => {
        if (!exchangeFiat) {
            setTransaction(calculateCrypto())
        } else {
            setTransaction(calculateFiat())
        }
    }, [recalculate])

    return (
        <>
            <TransactionFormPaidTo
                transaction={transaction}
                setTransaction={setTransaction}
                exchangeFiat={exchangeFiat}
                setExchangeFiat={setExchangeFiat}
            />
            <TransactionFormFiat
                transaction={transaction}
                setTransaction={setTransaction}
                exchangeFiat={exchangeFiat}
                setRecalculate={setRecalculate}
            />
            <TransactionFormCrypto
                transaction={transaction}
                setTransaction={setTransaction}
                exchangeFiat={exchangeFiat}
                setRecalculate={setRecalculate}
            />

        </>
    )
}

export default TransactionForm
