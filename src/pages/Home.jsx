import React from 'react'
import Matches_Scroll from './Match/Matches_Scroll'
import DataTable from '../components/DataTable'
import EmailVerificationDialog from '../components/verifyDialog'
import SignUpPage from '../components/SignUpPage'

const Home = () => {
    return (
        <>

            <div className='bg-gray-900 h-screen flex justify-center items-center'>
                {/* <Matches_Scroll />
                <DataTable />
                <EmailVerificationDialog /> */}
                <SignUpPage />
                <EmailVerificationDialog />

            </div>
        </>
    )
}

export default Home

