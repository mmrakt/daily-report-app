import { NextApiRequest, NextApiResponse } from 'next'
import prisma, { CategoriesOnRoles } from '@/libs/prisma'

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    const roleId = Number(req.query.roleId)
    if (req.method === 'GET') {
        const categories = await prisma.category.findMany({
            where: {
                roles: {
                    every: {
                        roleId: {
                            equals: roleId,
                        },
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
        const body = JSON.parse(req.body) as CategoriesOnRoles[]
        console.log(body)
        const { roleId } = body['categoriesOnRoles'][0]

        try {
            await prisma.$transaction([
                prisma.categoriesOnRoles.deleteMany({
                    where: {
                        roleId: {
                            equals: roleId,
                        },
                    },
                }),
                prisma.categoriesOnRoles.createMany({
                    data: body['categoriesOnRoles'],
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
