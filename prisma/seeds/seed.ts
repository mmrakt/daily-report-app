import prisma from '../../src/libs/prisma'

const seed = async (): Promise<void> => {
    // roles()
    // users()
    // categories()
    // projects()
    tasks()
}

const roles = async () => {
    await prisma.role.create({ data: { name: 'admin' } })
    await prisma.role.create({ data: { name: 'user' } })
}

const users = async () => {
    await prisma.user.createMany({
        data: Array(5)
            .fill(0)
            .map((v, i) => ({
                customId: 'id_00' + i.toString(),
                name: 'admin_00' + i.toString(),
                email: 'email' + i.toString() + '@gmail.com',
                roleId: 1,
            })),
    })
    await prisma.user.createMany({
        data: Array(5)
            .fill(0)
            .map((v, i) => ({
                customId: 'id_00' + i.toString(),
                name: 'user_00' + i.toString(),
                email: 'email' + i.toString() + '@gmail.com',
                roleId: 2,
            })),
    })
}

const categories = async () => {
    await prisma.category.createMany({
        data: Array(10)
            .fill(0)
            .map((v, i) => ({
                name: '作業カテゴリー' + i.toString(),
            })),
    })
}

const projects = async () => {
    await prisma.project.createMany({
        data: Array(10)
            .fill(0)
            .map((v, i) => ({
                name: 'プロジェクト' + i.toString(),
            })),
    })
}

const tasks = async () => {
    const dateList = [
        '2022-08-26',
        '2022-08-27',
        '2022-08-28',
        '2022-08-29',
        '2022-08-30',
        '2022-08-31',
        '2022-09-01',
        '2022-09-03',
        '2022-09-04',
    ]
    dateList.forEach(async (date) => {
        await prisma.task.createMany({
            data: Array(10)
                .fill(0)
                .map((v, i) => ({
                    summary: '作業' + i.toString(),
                    note: '補足' + i.toString(),
                    date,
                    hours: 0.25 * (i + 1),
                    categoryId: i + 1,
                    projectId: i + 1,
                    userId: 1,
                })),
        })
    })
}

seed()
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
