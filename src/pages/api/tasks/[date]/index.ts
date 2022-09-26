import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prisma'

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    const query = req.query
    const date = String(query.date)
    const userId = query.userId as string
    switch (req.method) {
        case 'GET': {
            const tasks = await prisma.task.findMany({
                where: {
                    date: {
                        equals: date,
                    },
                    userId: {
                        equals: userId,
                    },
                },
            })

            if (tasks) {
                res.status(200).json(tasks)
            } else {
                res.status(400).json({
                    debugMessage: `task not found...`,
                })
            }
            break
        }
        default:
            res.status(405).end()
    }
}

export default handler
