import type { NextPage } from 'next'
import Head from 'next/head'
import { CustomizedContainer } from '../components/Base/CustomizedContainer'
import Transaction from '../components/Transaction/Transaction'


const Home: NextPage = () => {
  return (
    <div >
      <Head>
        <title>Frontend Assignment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CustomizedContainer>
        <Transaction />
      </CustomizedContainer>
    </div>
  )
}

export default Home
