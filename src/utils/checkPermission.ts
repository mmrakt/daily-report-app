import { authOptions } from '@/pages/api/auth/[...nextauth]'
import prisma from '@/libs/prisma'
import { GetServerSidePropsContext } from 'next'
import { unstable_getServerSession } from 'next-auth'

const checkPermission = async (context: GetServerSidePropsContext) => {
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

export default checkPermission
