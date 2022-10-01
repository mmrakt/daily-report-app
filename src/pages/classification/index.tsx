import React from 'react'
import {
    CategoriesBlock,
    ProjectsBlock,
    RolesBlock,
} from '@/components/classification/Block'
import { SignedInHeader } from '@/components/layout/header'
import Main from '@/components/layout/Main'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import LoadingSpinner from '@/components/common/LoadingSpinner'

const ClassificationPage: React.FC = () => {
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
                <div className="class">
                    <RolesBlock />
                    <div className="mt-5"></div>
                    <CategoriesBlock />
                    <div className="mt-5"></div>
                    <ProjectsBlock />
                </div>
            </Main>
        </>
    )
}

export default ClassificationPage
