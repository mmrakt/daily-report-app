import SignedInHeader from '@/components/layout/header/SIgnedInHeader'
import React from 'react'
import Layout from '../components/layout'
import CalendarContainer from '../components/top/CalendarContainer'

const Index = (): React.ReactElement => {
    return (
        <Layout>
            <SignedInHeader />
            <CalendarContainer />
        </Layout>
    )
}

export default Index
