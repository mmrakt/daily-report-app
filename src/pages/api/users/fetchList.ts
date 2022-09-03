import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../libs/prisma'

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    if (req.method === 'GET') {
        const userList = await prisma.user.findMany()
        return res.status(200).json(userList)
    }
}
