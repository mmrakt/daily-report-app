import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prisma'
import { Category, Prisma, PrismaClient } from '@prisma/client'

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    if (req.method === 'GET') {
        await findMany(prisma, req, res)
    } else if (req.method === 'POST') {
        await upsert(prisma, req, res)
    } else if (req.method === 'PATCH') {
        await updateMany(prisma, req, res)
    } else {
        res.status(405).end()
    }
}

const findMany = async (
    prisma: PrismaClient,
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const categories = await prisma.category.findMany({
        where: {
            status: {
                equals: 'enable',
            },
        },
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
}

const upsert = async (
    prisma: PrismaClient,
    req: NextApiRequest,
    res: NextApiResponse
) => {
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
}

const updateMany = async (
    prisma: PrismaClient,
    req: NextApiRequest,
    res: NextApiResponse
) => {
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
}

export default handler
