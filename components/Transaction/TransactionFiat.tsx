import { FIAT } from "../../@types"

type TransactionFiat = {
    fiat: FIAT
}
export const TransactionFiat = ({ fiat }: TransactionFiat) => {
    return <>
        {`${fiat.amount} ${fiat.currency}`}
    </>
}