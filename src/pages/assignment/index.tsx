import React from 'react'
import SearchResultContainer from '../../components/assignment/SearchResultContainer'
import SearchContainer from '@/components/assignment/SearchContainer'
import { SignedInHeader } from '@/components/layout/header'
import Main from '@/components/layout/Main'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import prisma from '../../libs/prisma'
import { GetServerSidePropsContext } from 'next'
import CustomError from '../CustomError'

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
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
    )

    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: '/signin',
            },
        }
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session?.user?.id,
        },
        include: {
            role: {
                select: {
                    privilege: true,
                },
            },
        },
    })

    if (user?.role?.privilege === 'admin') {
        return {
            props: {
                errorCode: null,
                userId: user.id,
            },
        }
    }

    return {
        props: {
            errorCode: 403,
        },
    }
}

export default AssignmentPage
