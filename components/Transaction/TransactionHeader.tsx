import styled from "@emotion/styled"
import { Grid, Typography } from "@mui/material"
import { Transaction, TransactionRaw } from "../../@types"
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
    addNewTransaction: (t: TransactionRaw) => void
}
const TransactionHeader = ({ addNewTransaction }: TransactionHeader) => {
    return (
        <Grid container>
            <Grid item xs={8}>
                <HeaderTypography variant="h2">
                    Transaction History
                </HeaderTypography>
            </Grid>
            <GridItemActions item xs={4}>
                <TransactionActions addNewTransaction={addNewTransaction} />
            </GridItemActions>
        </Grid>
    )
}

export default TransactionHeader
