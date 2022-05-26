import { Crypto } from "../../@types"

type TransactionCrypto = {
    crypto: Crypto
}
export const TransactionCrypto = ({ crypto }: TransactionCrypto) => {
    return <>
        {`${crypto.amount} ${crypto.currency}`}
    </>
}