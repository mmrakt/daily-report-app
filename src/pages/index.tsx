import Header from '@/components/layout/header'
import React from 'react'
import CalendarContainer from '../components/top/CalendarContainer'
import Main from '../components/layout/Main'
import { GetServerSidePropsContext } from 'next'
import isPermittedRole from '../utils/isPermiteedRole'
import hasSession from '../utils/hasSession'

const Index: React.FC<{ isPermitted: boolean }> = ({ isPermitted }) => {
    return (
        <>
            <Header isPermitted={isPermitted} />
            <Main>
                <CalendarContainer />
            </Main>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await hasSession(context)
    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: '/signin',
            },
        }
    }

    const isPermitted = isPermittedRole(session?.user?.id)
    return {
        props: isPermitted,
    }
}

export default Index
