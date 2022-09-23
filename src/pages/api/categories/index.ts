import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prisma'
import { Category } from '@prisma/client'

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    if (req.method === 'GET') {
        const categories = await prisma.category.findMany({
            include: {
                roles: {
                    select: {
                        roleId: true,
                    },
                },
            },
        })

        if (categories) {
            res.status(200).json(categories)
        } else {
            res.status(400).json({ debugMessage: 'There was no one...' })
        }
    } else if (req.method === 'POST') {
        const body = JSON.parse(req.body) as Category[]
        const query = body['categories'].map((category) =>
            prisma.category.upsert({
                where: {
                    id: category.id,
                },
                update: {
                    name: category.name,
                },
                create: {
                    name: category.name,
                },
            })
        )
        try {
            await prisma.$transaction([...query])
            res.status(200).end()
        } catch (error) {
            console.error(error)
            res.status(500).end()
        }
    } else if (req.method === 'PATCH') {
        const body = JSON.parse(req.body) as Category[]
        const ids = body['ids']
        try {
            await prisma.category.updateMany({
                where: {
                    id: {
                        in: ids,
                    },
                },
                data: {
                    status: 'disable',
                },
            }),
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
