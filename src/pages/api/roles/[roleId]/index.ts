import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prisma'
import { Role } from '@prisma/client'

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    if (req.method === 'POST') {
        const query = req.query
        const roleId = Number(query.roleId)
        const body = JSON.parse(req.body) as Role

        try {
            await prisma.role.upsert({
                where: {
                    id: roleId,
                },
                update: {
                    name: body.name,
                },
                create: {
                    name: body.name,
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
