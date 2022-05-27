import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, Grid, MenuItem, Select, Slide, Switch, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { Transaction, TransactionRaw } from "../../../@types"
import { PriceAPI } from "../../../api/prices"
import { Crypto, CryptoSymbol, CryptoType, FIAT, FIATSymbol, FIATType, State } from "../../../Enums"
import { usePrices } from "../../../hooks/usePrices"

const newTransaction: TransactionRaw = {
    state: State.PS_RUNNING,
    creationDate: (new Date()).toISOString(),
    payedToId: '',
    fiat: {
        amount: '0',
        currency: FIATType.FC_EURO,
    },
    crypto: {
        amount: '0',
        currency: CryptoType.CC_BITCOIN,
    },
}

type TransactionHeader = {
    removeTransaction: (t: Transaction) => void
    addNewTransaction: (t: Transaction) => void
}
const TransactionActions = ({ removeTransaction, addNewTransaction }: TransactionHeader) => {

    const [showInput, setShowInput] = useState(false)
    const [exchangeFiat, setExchangeFiat] = useState(false)
    const [transaction, setTransaction] = useState<TransactionRaw>(newTransaction)
    const { loadPrice, calcFiatPrice, calcCryptoPrice } = usePrices()

    const cryptoCurrencies = Object.values(CryptoType);
    const fiatCurrencies = Object.values(FIATType);

    const toggleInput = () => {
        setShowInput(old => !old)
    }
    const handleClose = () => {
        setShowInput(old => !old)
    }
    const handleSaveNewTransaction = () => {
        console.log(transaction)
    }

    const handlePaidToId = (event: any) => {
        setTransaction({ ...transaction, payedToId: event.target.value })
    }

    const handleCryptoCurrency = (event: any) => {
        setTransaction({
            ...transaction,
            crypto: {
                ...transaction.crypto,
                currency: event.target.value
            }
        })
    }
    const handleCryptoAmount = (event: any) => {
        setTransaction({
            ...transaction, crypto: {
                ...transaction.crypto,
                amount: event.target.value
            }
        })
    }

    const handleFIATCurrency = (event: any) => {
        setTransaction({
            ...transaction, fiat: {
                ...transaction.fiat,
                currency: event.target.value
            }
        })
    }
    const handleFIATAmount = (event: any) => {
        setTransaction({
            ...transaction, fiat: {
                ...transaction.fiat,
                amount: event.target.value
            }
        })
    }

    const handleCurrency = (event: any) => {
        setExchangeFiat(old => !old)
    }

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

    useEffect(() => {
        if (!exchangeFiat) {
            setTransaction({
                ...transaction, crypto: {
                    ...transaction.crypto,
                    amount: calcCryptoPrice({
                        crypto: transaction.crypto.currency,
                        fiat: transaction.fiat.currency,
                        amount: transaction.fiat.amount
                    })
                }
            })
        }
    }, [transaction.fiat.amount])

    useEffect(() => {
        if (exchangeFiat) {
            setTransaction({
                ...transaction, fiat: {
                    ...transaction.fiat,
                    amount: calcFiatPrice({
                        crypto: transaction.crypto.currency,
                        fiat: transaction.fiat.currency,
                        amount: transaction.crypto.amount
                    })
                }
            })
        }
    }, [transaction.crypto.amount])

    return (
        <Box>
            <Dialog open={showInput} onClose={handleClose}>
                <DialogTitle>New transaction</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create new transaction
                    </DialogContentText>

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

                    <Grid container>
                        <Grid item>
                            <FormControl sx={{ m: 1 }} variant="standard">
                                <TextField
                                    id="crypto-amount"
                                    label="Crypto amount"
                                    disabled={!exchangeFiat}
                                    type="text"
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

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSaveNewTransaction}>Save</Button>
                </DialogActions>
            </Dialog>
            <Button
                variant="contained"
                onClick={toggleInput}
            >
                Add
            </Button>
        </Box >
    )
}

export default TransactionActions
