import SignedInHeader from '@/components/layout/header/SIgnedInHeader'
import React from 'react'
import CalendarContainer from '../components/top/CalendarContainer'
import Main from '../components/layout/Main'

const Index: React.FC = () => {
    return (
        <>
            <SignedInHeader />
            <Main>
                <CalendarContainer />
            </Main>
        </>
    )
}

export default Index
