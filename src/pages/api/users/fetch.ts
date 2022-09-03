import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../libs/prisma'

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    if (req.method === 'GET') {
        const user = await prisma.user.findFirst({
            where: { customId: String(req.query.id) },
        })
        return res.status(200).json(user)
    }
}
