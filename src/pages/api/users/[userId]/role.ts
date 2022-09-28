import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prisma'

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    if (req.method !== 'GET') {
        res.status(405).end()
    }
    const userId = req.query.userId as string
    const userPrivilege = await prisma.user.findUnique({
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
    if (userPrivilege) {
        res.status(200).json(userPrivilege)
    } else {
        res.status(400).json({ debugMessage: 'There was no one...' })
    }
}

export default handler
