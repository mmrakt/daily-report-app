import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prisma'
import { ProjectsOnRoles } from '../../../../hooks/role/useCreateProjectsOnRole'

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
    } else if (req.method === 'POST') {
        const body = JSON.parse(req.body) as ProjectsOnRoles[]
        const { roleId } = body['projectsOnRoles'][0]

        try {
            await prisma.$transaction([
                prisma.projectsOnRoles.deleteMany({
                    where: {
                        roleId: {
                            equals: roleId,
                        },
                    },
                }),
                prisma.projectsOnRoles.createMany({
                    data: body['projectsOnRoles'],
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
