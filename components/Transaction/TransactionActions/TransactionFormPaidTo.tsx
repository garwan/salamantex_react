import { FormControl, FormControlLabel, Grid, Switch, TextField } from "@mui/material"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { TransactionRaw } from "../../../@types"
import { TransactionErrors } from "../../../Enums"

type TransactionFormPaidTo = {
    transaction: TransactionRaw
    setTransaction: (transaction: TransactionRaw) => void
    exchangeFiat: boolean
    setExchangeFiat: Dispatch<SetStateAction<boolean>>
}
const TransactionFormPaidTo = ({ transaction, exchangeFiat, setTransaction, setExchangeFiat }: TransactionFormPaidTo) => {
    const [hasError, setHasError] = useState(false)
    const [error, setError] = useState<string | undefined>()
    const { errors } = transaction

    const handlePaidToId = (event: any) => {
        setTransaction({ ...transaction, payedToId: event.target.value })
    }

    const handleCurrency = (event: any) => {
        setExchangeFiat(old => !old)
    }

    useEffect(() => {
        setError(errors?.payedToId ?? undefined)
    }, [errors])

    useEffect(() => {
        setHasError(Boolean(error))
    }, [error])

    return (
        <Grid container>
            <Grid item >
                <FormControl sx={{ m: 1 }} variant="standard" >
                    <TextField
                        error={hasError}
                        helperText={error}
                        id="payedToId"
                        label="Recipient address"
                        type="text"
                        onChange={handlePaidToId}
                        value={transaction.payedToId}
                        fullWidth
                        variant="standard"
                    />
                </FormControl>
            </Grid>
            <Grid item >
                <FormControlLabel
                    value="top"
                    control={<Switch onChange={handleCurrency} color="primary" />}
                    label={exchangeFiat ? "Crypto" : "FIAT"}
                    labelPlacement="top"
                />
            </Grid>
        </Grid>
    )
}

export default TransactionFormPaidTo
