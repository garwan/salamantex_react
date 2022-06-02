import { FormControl, Grid, MenuItem, TextField } from "@mui/material"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { TransactionRaw } from "../../../@types"
import { CryptoSymbol, CryptoType, TransactionErrors, } from "../../../Enums"

type TransactionFormCrypto = {
    transaction: TransactionRaw
    setTransaction: (transaction: TransactionRaw) => void
    exchangeFiat: boolean
    setRecalculate: Dispatch<SetStateAction<boolean>>
}
const TransactionFormCrypto = ({ transaction, setTransaction, exchangeFiat, setRecalculate }: TransactionFormCrypto) => {
    const [hasError, setHasError] = useState(false)
    const [error, setError] = useState<string | undefined>()
    const { errors } = transaction

    const cryptoCurrencies = Object.values(CryptoType);

    const handleCryptoCurrency = (event: any) => {
        setTransaction({
            ...transaction,
            crypto: {
                ...transaction.crypto,
                currency: event.target.value
            }
        })
        setRecalculate(old => !old)
    }
    const handleCryptoAmount = (event: any) => {
        setTransaction({
            ...transaction, crypto: {
                ...transaction.crypto,
                amount: event.target.value
            }
        })
    }

    useEffect(() => {
        setError(errors?.crypto?.amount ?? undefined)
    }, [errors])

    useEffect(() => {
        setHasError(Boolean(error))
    }, [error])

    return (
        <Grid container>
            <Grid item>
                <FormControl sx={{ m: 1 }} variant="standard">
                    <TextField
                        id="crypto-amount"
                        label="Crypto amount"
                        disabled={!exchangeFiat}
                        error={hasError}
                        helperText={error}
                        type="number"
                        onChange={handleCryptoAmount}
                        value={transaction.crypto.amount}
                        fullWidth
                        variant="standard"
                    />
                </FormControl>
            </Grid>
            <Grid item>
                <FormControl sx={{ m: 1 }} variant="standard">
                    <TextField
                        variant="standard"
                        select
                        id="select-crypto-currency"
                        value={transaction.crypto.currency}
                        onChange={handleCryptoCurrency}
                        label="Crypto"
                    >
                        {cryptoCurrencies.map(
                            (currency: string) =>
                                <MenuItem key={currency} value={currency}>{(CryptoSymbol as any)[currency]}</MenuItem>
                        )}
                    </TextField>
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default TransactionFormCrypto
