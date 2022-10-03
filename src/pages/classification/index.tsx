import React from 'react'
import {
    CategoriesBlock,
    ProjectsBlock,
    RolesBlock,
} from '@/components/classification/Block'
import Header from '@/components/layout/header'
import Main from '@/components/layout/Main'
import { GetServerSidePropsContext } from 'next'
import CustomError from '../../components/common/CustomError'
import hasSession from '@/utils/hasSession'
import isPermittedRole from '@/utils/isPermiteedRole'

const ClassificationPage: React.FC<{
    errorCode: number
    isPermitted: boolean
}> = ({ errorCode, isPermitted }) => {
    if (errorCode) {
        return <CustomError errorCode={errorCode} />
    }

    return (
        <>
            <Header isPermitted={isPermitted} />
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

export default ClassificationPage
