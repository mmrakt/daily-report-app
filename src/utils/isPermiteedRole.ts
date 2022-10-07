import prisma from '@/libs/prisma'

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
