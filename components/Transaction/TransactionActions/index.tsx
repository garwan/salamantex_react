import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, TextField } from "@mui/material"
import { useState } from "react"
import { Transaction } from "../../../@types"
import { Crypto, FIAT, State } from "../../../Enums"

const newTransaction: Transaction = {
    state: State.PS_RUNNING,
    creationDate: new Date(),
    payedToId: '',
    fiat: {
        amount: '0',
        currency: FIAT.FC_EURO,
    },
    crypto: {
        amount: '0',
        currency: Crypto.CC_BITCOIN,
    },
}

type TransactionHeader = {
    removeTransaction: (t: Transaction) => void
    addNewTransaction: (t: Transaction) => void
}
const TransactionActions = ({ removeTransaction, addNewTransaction }: TransactionHeader) => {

    const [showInput, setShowInput] = useState(false)
    const [transaction, setTransaction] = useState<Transaction>(newTransaction)

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

    // https://blockchain.info/tobtc?currency=USD&value=10

    return (
        <Box>
            <Dialog open={showInput} onClose={handleClose}>
                <DialogTitle>New transaction</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create new transaction
                    </DialogContentText>
                    <TextField
                        id="payedToId"
                        label="Recipient address"
                        type="text"
                        onChange={handlePaidToId}
                        value={transaction.payedToId}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        id="name"
                        label="Recipient address"
                        type="text"
                        onChange={handlePaidToId}
                        value={transaction.payedToId}
                        fullWidth
                        variant="standard"
                    />
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
        </Box>
    )
}

export default TransactionActions
