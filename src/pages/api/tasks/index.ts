import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prisma'
import { CreateTasks } from '../../../hooks/task/useCreateTasksByDate'

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    if (req.method === 'GET') {
        const userId = Number(req.query.userId)
        const tasks = await prisma.task.groupBy({
            by: ['date'],
            where: {
                userId: {
                    equals: userId,
                },
            },
        })
        if (tasks) {
            res.status(200).json(tasks)
        } else {
            res.status(400).json({ debugMessage: 'There was no one...' })
        }
    } else if (req.method === 'POST') {
        const body = JSON.parse(req.body) as CreateTasks[]
        const { userId, date } = body['tasks'][0]

        try {
            await prisma.$transaction([
                prisma.task.deleteMany({
                    where: {
                        userId: {
                            equals: userId,
                        },
                        date: {
                            equals: date,
                        },
                    },
                }),
                prisma.task.createMany({
                    data: body['tasks'],
                    skipDuplicates: true,
                }),
            ])
            res.status(200).end()
        } catch (error) {
            console.error(error)
            res.status(500).end()
        }
    } else {
        res.status(405).end()
    }
}

export default handler
