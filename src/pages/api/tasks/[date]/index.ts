import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prisma'

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    const query = req.query
    const date = String(query.date)
    const userId = Number(query.userId)
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
        case 'PATCH':
            // try {
            //     const value = JSON.parse(req.body)
            //     await prisma.task.update({ where: { userId }, data: value })
            //     res.status(200).end()
            // } catch (error) {
            //     console.error(error)
            //     res.status(500).end()
            // }
            break
        case 'DELETE':
            // try {
            //     await prisma.task.delete({ where: { userId } })
            //     res.status(200).end()
            // } catch (error) {
            //     console.error(error)
            //     res.status(500).end()
            // }
            break
        default:
            res.status(405).end()
    }
}

export default handler
