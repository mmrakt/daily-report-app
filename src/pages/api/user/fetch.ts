import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    if (req.method === 'GET') {
        const userList = await prisma.user.findFirst({
            where: { id: req.body.id },
        })
        return res.status(200).json(userList)
    }
}
