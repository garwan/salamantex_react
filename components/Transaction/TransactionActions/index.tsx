import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useState } from "react"
import { Transaction, TransactionRaw } from "../../../@types"
import { CryptoType, FIATType, State } from "../../../Enums"
import TransactionForm from "./TransactionForm"

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
    addNewTransaction: (t: TransactionRaw) => void
}
const TransactionActions = ({ addNewTransaction }: TransactionHeader) => {

    const [showInput, setShowInput] = useState(false)
    const [transaction, setTransaction] = useState<TransactionRaw>(newTransaction)

    const toggleInput = () => {
        setShowInput(old => !old)
    }

    const handleSaveNewTransaction = () => {
        addNewTransaction(transaction);
        toggleInput()
        setTransaction(newTransaction)
    }

    return (
        <Box>
            <Dialog open={showInput} onClose={toggleInput}>
                <DialogTitle>New transaction</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create new transaction
                    </DialogContentText>

                    <TransactionForm
                        transaction={transaction}
                        setTransaction={setTransaction}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleInput}>Cancel</Button>
                    <Button onClick={handleSaveNewTransaction}>Save</Button>
                </DialogActions>
            </Dialog>
            <Button
                variant="contained"
                onClick={toggleInput}
            >
                Create Transaction
            </Button>
        </Box >
    )
}

export default TransactionActions
