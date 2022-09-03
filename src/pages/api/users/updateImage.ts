import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../libs/prisma'

const handler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        await prisma.user.update({
            where: {
                customId: String(req.query.customId),
            },
            data: {
                image: req.body,
            },
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
