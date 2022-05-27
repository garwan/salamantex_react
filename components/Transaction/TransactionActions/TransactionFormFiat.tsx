import { FormControl, Grid, MenuItem, TextField } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import { TransactionRaw } from "../../../@types"
import { } from "../../../api/prices"
import { FIATSymbol, FIATType } from "../../../Enums"

type TransactionFormFiat = {
    transaction: TransactionRaw
    setTransaction: (transaction: TransactionRaw) => void
    exchangeFiat: boolean
    setRecalculate: Dispatch<SetStateAction<boolean>>
}
const TransactionFormFiat = ({ transaction, setTransaction, exchangeFiat, setRecalculate }: TransactionFormFiat) => {

    const fiatCurrencies = Object.values(FIATType);

    const handleFIATCurrency = (event: any) => {
        setTransaction({
            ...transaction, fiat: {
                ...transaction.fiat,
                currency: event.target.value
            }
        })
        setRecalculate(old => !old)
    }
    const handleFIATAmount = (event: any) => {
        setTransaction({
            ...transaction, fiat: {
                ...transaction.fiat,
                amount: event.target.value
            }
        })
    }

    return (
        <Grid container>
            <Grid item >
                <FormControl sx={{ m: 1 }} variant="standard">
                    <TextField
                        id="fiat-amount"
                        label="FIAT amount"
                        disabled={exchangeFiat}
                        type="text"
                        onChange={handleFIATAmount}
                        value={transaction.fiat.amount}
                        fullWidth
                        variant="standard"
                    />
                </FormControl>
            </Grid>
            <Grid item >
                <FormControl sx={{ m: 1 }} variant="standard">
                    <TextField
                        id="select-fiat-currency"
                        variant="standard"
                        select
                        value={transaction.fiat.currency}
                        onChange={handleFIATCurrency}
                        label="FIAT"
                    >
                        {fiatCurrencies.map(
                            (currency: string) =>
                                <MenuItem key={currency} value={currency}>{(FIATSymbol as any)[currency]}</MenuItem>
                        )}
                    </TextField>
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default TransactionFormFiat
