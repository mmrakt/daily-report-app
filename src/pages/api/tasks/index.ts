import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prisma'

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
        try {
            const body = JSON.parse(req.body)
            const { userId, summary, date, projectId, categoryId, hours } = body
            const note = body.note ? body.note : ''
            await prisma.task.create({
                data: {
                    userId,
                    summary,
                    note,
                    date,
                    projectId,
                    hours,
                    categoryId,
                },
            })
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
