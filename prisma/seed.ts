import prisma from '../src/libs/prisma'
import { users } from './users'
import { tweets } from './tweets'

const seed = async (): Promise<void> => {
    for (const user of users) {
        await prisma.user.create({ data: user })
    }

    for (const tweet of tweets) {
        await prisma.tweet.create({ data: tweet })
    }
}

seed()
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
