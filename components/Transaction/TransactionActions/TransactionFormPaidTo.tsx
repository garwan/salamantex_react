import { FormControl, FormControlLabel, Grid, Switch, TextField } from "@mui/material"
import { Dispatch, SetStateAction, useState } from "react"
import { TransactionRaw } from "../../../@types"

type TransactionFormPaidTo = {
    transaction: TransactionRaw
    setTransaction: (transaction: TransactionRaw) => void
    exchangeFiat: boolean
    setExchangeFiat: Dispatch<SetStateAction<boolean>>
}
const TransactionFormPaidTo = ({ transaction, exchangeFiat, setTransaction, setExchangeFiat }: TransactionFormPaidTo) => {
    const handlePaidToId = (event: any) => {
        setTransaction({ ...transaction, payedToId: event.target.value })
    }

    const handleCurrency = (event: any) => {
        setExchangeFiat(old => !old)
    }

    return (
        <Grid container>
            <Grid item >
                <FormControl sx={{ m: 1 }} variant="standard" >
                    <TextField
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
