import prisma from '../src/lib/prisma'

const seed = async (): Promise<void> => {
    await prisma.user.upsert({
        where: { customId: 'testuser01' },
        update: {},
        create: {
            customId: 'testuser01',
            name: 'testuser01',
            profile: 'testtest',
            avatarUrl: '',
            tweetList: {
                create: {
                    content: 'ほげほげ',
                },
            },
        },
        select: { customId: true, name: true, profile: true },
    })
    await prisma.user.upsert({
        where: { customId: 'testuser02' },
        update: {},
        create: {
            customId: 'testuser02',
            name: 'testuser02',
            profile: 'testtesttest',
            avatarUrl: '',
            tweetList: {
                create: {
                    content: 'ふがふが',
                },
            },
        },
        select: { customId: true, name: true, profile: true },
    })
    await prisma.user.upsert({
        where: { customId: 'testuser03' },
        update: {},
        create: {
            customId: 'testuser03',
            name: 'testuser03',
            profile: 'testtesttest',
            avatarUrl: '',
            tweetList: {
                create: {
                    content: 'ぴよぴよ',
                },
            },
        },
        select: { customId: true, name: true, profile: true },
    })
}

seed()
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect
    })
