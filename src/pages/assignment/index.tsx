import React from 'react'
import SearchResultContainer from '../../components/assignment/SearchResultContainer'
import SearchContainer from '@/components/assignment/SearchContainer'
import { SignedInHeader } from '@/components/layout/header'
import Main from '@/components/layout/Main'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import LoadingSpinner from '@/components/common/LoadingSpinner'

const AssignmentPage: React.VFC = () => {
    const [selectedRoleId, setSelectedRoleId] = React.useState<string>()
    const [isDisplayed, setIsDisplayed] = React.useState<boolean>(false)

    const router = useRouter()
    const { data: session, status } = useSession()

    if (typeof window !== 'undefined') {
        if (status === 'loading') return <LoadingSpinner />
        if (status === 'unauthenticated') {
            router.push('/signin')
            return null
        }
    }

    const handleChange = (selectedRoleId: string) => {
        setSelectedRoleId(selectedRoleId)
        setIsDisplayed(false)
    }
    const handleDisplay = () => {
        setIsDisplayed(true)
    }
    return (
        <>
            <SignedInHeader userId={session?.user?.id} />
            <Main>
                <SearchContainer
                    onChange={handleChange}
                    onDisplay={handleDisplay}
                />
                <div className="mt-5" />
                {isDisplayed && (
                    <SearchResultContainer roleId={Number(selectedRoleId)} />
                )}
            </Main>
        </>
    )
}

export default AssignmentPage
