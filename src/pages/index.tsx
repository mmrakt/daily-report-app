import { SignedInHeader } from '@/components/layout/header'
import React from 'react'
import CalendarContainer from '../components/top/CalendarContainer'
import Main from '../components/layout/Main'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import LoadingSpinner from '@/components/common/LoadingSpinner'

const Index: React.FC = () => {
    const router = useRouter()
    const { data: session, status } = useSession()

    if (typeof window !== 'undefined') {
        if (status === 'loading') return <LoadingSpinner />
        if (status === 'unauthenticated') {
            router.push('/signin')
            return null
        }
    }
    return (
        <>
            <SignedInHeader userId={session?.user?.id} />
            <Main>
                <CalendarContainer />
            </Main>
        </>
    )
}

export default Index
