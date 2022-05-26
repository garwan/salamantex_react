import styled from "@emotion/styled"
import { Grid, Typography } from "@mui/material"
import { Transaction } from "../../@types"
import TransactionActions from "./TransactionActions"

const HeaderTypography = styled(Typography)`
    margin: 0.5em 0;
`

const GridItemActions = styled(Grid)`
    display: flex;
    justify-content: right;
    align-items: center;
`

type TransactionHeader = {
    removeTransaction: (t: Transaction) => void
    addNewTransaction: (t: Transaction) => void
}
const TransactionHeader = ({ removeTransaction, addNewTransaction }: TransactionHeader) => {
    return (
        <Grid container>
            <Grid item xs={8}>
                <HeaderTypography variant="h2">
                    Transaction History
                </HeaderTypography>
            </Grid>
            <GridItemActions item xs={4}>
                <TransactionActions addNewTransaction={addNewTransaction} removeTransaction={removeTransaction} />
            </GridItemActions>
        </Grid>
    )
}

export default TransactionHeader
