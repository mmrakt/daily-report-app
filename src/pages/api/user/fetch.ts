import { NextApiRequest, NextApiResponse } from 'next'
import { stringify } from 'querystring'
import prisma from '../../../lib/prisma'

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    if (req.method === 'GET') {
        //console.log(String(req.query.id))
        const user = await prisma.user.findFirst({
            where: { customId: String(req.query.id) },
        })
        return res.status(200).json(user)
    }
}
