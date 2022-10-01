import React from 'react'
import SearchResultContainer from '../../components/assignment/SearchResultContainer'
import SearchContainer from '@/components/assignment/SearchContainer'
import { SignedInHeader } from '@/components/layout/header'
import Main from '@/components/layout/Main'
import { GetServerSidePropsContext } from 'next'
import CustomError from '../../components/common/CustomError'
import checkPermission from '../../utils/checkPermission'

const AssignmentPage: React.FC<{ errorCode: number; userId: string }> = ({
    errorCode,
    userId,
}) => {
    const [selectedRoleId, setSelectedRoleId] = React.useState<string>()
    const [isDisplayed, setIsDisplayed] = React.useState<boolean>(false)

    if (errorCode) {
        return <CustomError errorCode={errorCode} />
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
            <SignedInHeader userId={userId} />
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return checkPermission(context)
}

export default AssignmentPage
