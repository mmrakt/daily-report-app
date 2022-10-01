import React from 'react'
import {
    CategoriesBlock,
    ProjectsBlock,
    RolesBlock,
} from '@/components/classification/Block'
import { SignedInHeader } from '@/components/layout/header'
import Main from '@/components/layout/Main'
import addCheckPermission from '@/utils/checkPermission'
import { GetServerSidePropsContext } from 'next'
import CustomError from '../../components/common/CustomError'

const ClassificationPage: React.FC<{ errorCode: number; userId: string }> = ({
    errorCode,
    userId,
}) => {
    if (errorCode) {
        return <CustomError errorCode={errorCode} />
    }

    return (
        <>
            <SignedInHeader userId={userId} />
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return addCheckPermission(context)
}

export default ClassificationPage
