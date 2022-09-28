import React from 'react'
import SearchResultContainer from '../../components/assignment/SearchResultContainer'
import SearchContainer from '@/components/assignment/SearchContainer'
import SignedInHeader from '@/components/layout/header/SIgnedInHeader'
import Main from '@/components/layout/Main'

const AssignmentPage: React.VFC = () => {
    const [selectedRoleId, setSelectedRoleId] = React.useState<string>()
    const [isDisplayed, setIsDisplayed] = React.useState<boolean>(false)

    const handleChange = (selectedRoleId: string) => {
        setSelectedRoleId(selectedRoleId)
        setIsDisplayed(false)
    }
    const handleDisplay = () => {
        setIsDisplayed(true)
    }
    return (
        <>
            <SignedInHeader />
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
