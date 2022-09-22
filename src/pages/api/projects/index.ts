import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prisma'
import { Project } from '@prisma/client'

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    if (req.method === 'GET') {
        const projects = await prisma.project.findMany({
            include: {
                roles: {
                    select: {
                        roleId: true,
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
        const body = JSON.parse(req.body) as Project[]
        const query = body['projects'].map((project) =>
            prisma.project.upsert({
                where: {
                    id: project.id,
                },
                update: {
                    name: project.name,
                },
                create: {
                    name: project.name,
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
    } else {
        res.status(405).end()
    }
}

export default handler
