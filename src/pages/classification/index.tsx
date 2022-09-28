import React from 'react'
import {
    CategoriesBlock,
    ProjectsBlock,
    RolesBlock,
} from '@/components/classification/Block'
import SignedInHeader from '@/components/layout/header/SIgnedInHeader'
import Main from '@/components/layout/Main'

const ClassificationPage: React.FC = () => {
    return (
        <>
            <SignedInHeader />
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
