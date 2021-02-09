import type { NextApiHandler } from 'next'
import prisma from '../../../lib/prisma'

const handler: NextApiHandler = async ({ body }: { body: string }, res) => {
    try {
        await prisma.tweet.create({
            data: {
                content: body,
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
