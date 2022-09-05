import type { NextApiHandler } from 'next'
import prisma from '../../../libs/prisma'

// type IProps = {
//     id: string
//     name: string
// }

const handler: NextApiHandler = async (req, res) => {
    try {
        const { tasks } = JSON.parse(req.body)

        // const data = {
        //     content,
        //     userId,
        //     projectId: projectId ? projectId : null,
        // }
        await prisma.task.createMany(tasks)
        res.status(200).end()
    } catch (error) {
        console.error(error)
        res.status(500).end()
    }
}

export default handler
