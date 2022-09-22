import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prisma'
import { Role } from '@prisma/client'

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    if (req.method === 'GET') {
        const roles = await prisma.role.findMany({})
        if (roles) {
            res.status(200).json(roles)
        } else {
            res.status(400).json({ debugMessage: 'There was no one...' })
        }
    } else if (req.method === 'POST') {
        const body = JSON.parse(req.body) as Role[]
        const query = body['roles'].map((role) =>
            prisma.role.upsert({
                where: {
                    id: role.id,
                },
                update: {
                    name: role.name,
                },
                create: {
                    name: role.name,
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
    } else if (req.method === 'DELETE') {
        const body = JSON.parse(req.body) as Role[]
        const ids = body['ids']
        try {
            await prisma.$transaction([
                prisma.projectsOnRoles.deleteMany({
                    where: {
                        roleId: {
                            in: ids,
                        },
                    },
                }),
                prisma.categoriesOnRoles.deleteMany({
                    where: {
                        roleId: {
                            in: ids,
                        },
                    },
                }),
                prisma.role.deleteMany({
                    where: {
                        id: {
                            in: ids,
                        },
                    },
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
