import type { NextApiHandler } from 'next'
import prisma from '../../../libs/prisma'

// type IProps = {
//     id: string
//     name: string
// }

//TODO: JSONの型定義をちゃんとやる
const handler: NextApiHandler = async ({ body }, res) => {
    try {
        const { id, name } = JSON.parse(body)
        await prisma.user.create({
            data: {
                id: id,
                name: name,
            },
        })
        res.json({
            ok: true,
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
