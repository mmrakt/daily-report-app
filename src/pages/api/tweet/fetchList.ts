import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    if (req.method === 'GET') {
        const tweetList = await prisma.tweet.findMany({
            orderBy: {
                updatedAt: 'desc',
            },
        })
        return res.status(200).json(tweetList)
    }
}
