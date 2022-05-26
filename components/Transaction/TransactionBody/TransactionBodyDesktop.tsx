import styled from "@emotion/styled";
import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material"
import { useEffect, useState } from "react";
import { Transaction } from "../../../@types";
import { TransactionCrypto } from "../TransactionCrypto";
import { TransactionFiat } from "../TransactionFiat";
import { TransitionGroup } from 'react-transition-group';

const HeaderTableCell = styled(TableCell)`
    background-color: #000;
    color: #fff!important;
`

const BodyTableRow = styled(TableRow)`
    &:nth-of-type(odd) td {
        background:#EBEBEB;
    }
`

type TransactionBodyMobile = {
    transactions: Transaction[]
    loading: boolean
}
const TransactionBodyMobile = ({ transactions, loading }: TransactionBodyMobile) => {
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [page, setPage] = useState(0)
    const [selected, setSelected] = useState<Transaction[]>(transactions
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        setSelected(transactions
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
    }, [page, rowsPerPage, transactions])

    return (
        <Paper>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <HeaderTableCell>Transaction ID</HeaderTableCell>
                            <HeaderTableCell align="right">Created at</HeaderTableCell>
                            <HeaderTableCell align="right">Paid to</HeaderTableCell>
                            <HeaderTableCell align="right">State</HeaderTableCell>
                            <HeaderTableCell align="right">FIAT</HeaderTableCell>
                            <HeaderTableCell align="right">CRYPTO</HeaderTableCell>
                            <HeaderTableCell align="right">Paid at</HeaderTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {selected.map((transaction: Transaction) => (
                            <BodyTableRow
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
                                    <Chip label={transaction.state} color={transaction.stateColor} />
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
                            </BodyTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={transactions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

export default TransactionBodyMobile
