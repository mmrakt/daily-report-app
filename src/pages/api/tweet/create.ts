import type { NextApiHandler } from 'next'
import prisma from '../../../lib/prisma'

const handler: NextApiHandler = async ({ body }, res) => {
    try {
        const { customId, content } = JSON.parse(body)
        await prisma.tweet.create({
            data: {
                content,
                userId: customId,
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
