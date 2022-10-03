import React from 'react'
import SearchResultContainer from '../../components/assignment/SearchResultContainer'
import SearchContainer from '@/components/assignment/SearchContainer'
import Header from '@/components/layout/header'
import Main from '@/components/layout/Main'
import { GetServerSidePropsContext } from 'next'
import CustomError from '../../components/common/CustomError'
import isPermittedRole from '../../utils/isPermiteedRole'
import hasSession from '@/utils/hasSession'

const AssignmentPage: React.FC<{ errorCode: number; isPermitted: boolean }> = ({
    errorCode,
    isPermitted,
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
            <Header isPermitted={isPermitted} />
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
    const session = await hasSession(context)
    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: '/signin',
            },
        }
    }
    return {
        props: isPermittedRole(session?.user?.id)
            ? { errorCode: null, isPermitted: true }
            : { errorCode: 403 },
    }
}

export default AssignmentPage
