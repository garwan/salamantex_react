import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Transaction } from "../../@types";
import { TransactionCrypto } from "./TransactionCrypto";
import { TransactionFiat } from "./TransactionFiat";

type TransactionBody = {
    transactions: Transaction[]
    loading: boolean
}
const TransactionBody = ({ transactions, loading }: TransactionBody) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Transaction ID</TableCell>
                        <TableCell align="right">Created at</TableCell>
                        <TableCell align="right">Paid to</TableCell>
                        <TableCell align="right">State</TableCell>
                        <TableCell align="right">FIAT</TableCell>
                        <TableCell align="right">CRYPTO</TableCell>
                        <TableCell align="right">Paid at</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((transaction: Transaction) => (
                        <TableRow
                            key={transaction.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left">{transaction.id}</TableCell>
                            <TableCell align="right">
                                {transaction.creationDate.toLocaleDateString()}
                            </TableCell>
                            <TableCell align="right">
                                {transaction.payedToId}
                            </TableCell>
                            <TableCell align="right">
                                {transaction.state}
                            </TableCell>
                            <TableCell align="right">
                                <TransactionFiat fiat={transaction.fiat} />
                            </TableCell>
                            <TableCell align="right">
                                <TransactionCrypto crypto={transaction.crypto} />
                            </TableCell>
                            <TableCell align="right">
                                {transaction.payDate && transaction.payDate.toLocaleDateString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TransactionBody
