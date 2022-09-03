import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../libs/prisma'

type IBody = {
    userName: string
    profile: string
}

const handler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        const { userName, profile }: IBody = JSON.parse(req.body)
        await prisma.user.update({
            where: {
                customId: String(req.query.customId),
            },
            data: {
                name: userName,
                profile,
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
