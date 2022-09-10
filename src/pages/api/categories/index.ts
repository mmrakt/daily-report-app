import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prisma'

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    if (req.method === 'GET') {
        // const roleId = Number(req.query.roleId)
        // const categories = await prisma.category.groupBy({
        //     by: ['date'],
        //     where: {
        //         userId: {
        //             equals: roleId,
        //         },
        //     },
        // })

        if (categories) {
            res.status(200).json(categories)
        } else {
            res.status(400).json({ debugMessage: 'There was no one...' })
        }
    } else if (req.method === 'POST') {
        // try {
        //     const body = JSON.parse(req.body)
        //     const { roleId, summary, date, projectId, categoryId, hours } = body
        //     const note = body.note ? body.note : ''
        //     await prisma.task.create({
        //         data: {
        //             userId,
        //             summary,
        //             note,
        //             date,
        //             projectId,
        //             hours,
        //             categoryId,
        //         },
        //     })
        //     res.status(200).end()
        // } catch (error) {
        //     console.error(error)
        //     res.status(500).end()
        // }
    } else {
        res.status(405).end()
    }
}

export default handler