import prisma from '@/libs/prisma'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { GetServerSidePropsContext } from 'next'
import { unstable_getServerSession } from 'next-auth'

const isPermittedRole = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            role: {
                select: {
                    privilege: true,
                },
            },
        },
    })

    return {
        isPermitted: user?.role?.privilege === 'admin' ? true : false,
    }
}

export default isPermittedRole
