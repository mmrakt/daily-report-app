import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

const handler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        await prisma.tweet.delete({
            where: {
                id: Number(req.query.id),
            },
        })
        res.json({
            ok: true,
        })
        return
    } catch (error) {
        res.json({
            ok: false,
            error,
        })
    }
}

export default handler
