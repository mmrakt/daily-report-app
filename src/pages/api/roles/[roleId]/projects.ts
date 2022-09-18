import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prisma'

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    if (req.method === 'GET') {
        const roleId = Number(req.query.roleId)
        const projects = await prisma.project.findMany({
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

        if (projects) {
            res.status(200).json(projects)
        } else {
            res.status(400).json({ debugMessage: 'There was no one...' })
        }
    } else {
        res.status(405).end()
    }
}

export default handler
