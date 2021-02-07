import type { NextApiHandler, NextApiRequest } from 'next'
import prisma from '../../../lib/prisma'

// type IProps = {
//     id: string
//     name: string
// }

//TODO: JSONの型定義をちゃんとやる

const handler: NextApiHandler = async (req: NextApiRequest, res) => {
    try {
        const { userName, profile } = JSON.parse(req.body)
        await prisma.user.update({
            where: {
                customId: String(req.query.customId),
            },
            data: {
                name: userName,
                profile,
            },
        })
        return
    } catch (error) {
        res.json({
            ok: false,
            error,
        })
    }
}

export default handler
