import React from 'react'
import Header from './header/index'
import { useSession } from 'next-auth/react'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { useRouter } from 'next/router'

type LayoutProps = {
    children: React.ReactNode
}

const Layout = (props: LayoutProps): React.ReactElement => {
    const { data: session, status } = useSession()
    const router = useRouter()

    if (status === 'loading') return <LoadingSpinner />

    if (status === 'unauthenticated') router.push('/signin')

    return (
        <div className="flex-grow">
            <Header />
            <main className="max-w-screen-md mx-auto my-20">
                {props.children}
            </main>
        </div>
    )
}

export default Layout
