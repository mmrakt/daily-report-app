import prisma from '../../src/libs/prisma'

const sleep = (second) =>
    new Promise((resolve) => setTimeout(resolve, second * 1000))

const seed = async (): Promise<void> => {
    roles()
    await sleep(3)
    users()
    await sleep(3)
    categories()
    await sleep(3)
    projects()
    await sleep(3)
    projectsOnRoles()
    await sleep(3)
    categoriesOnRoles()
    await sleep(3)
    tasks()
}

const roles = async () => {
    await prisma.role.create({ data: { name: 'admin' } })
    await prisma.role.create({ data: { name: 'user' } })
    await prisma.role.create({ data: { name: 'owner' } })
}

const users = async () => {
    await prisma.user.createMany({
        data: Array(5)
            .fill(0)
            .map((v, i) => ({
                id: 'owner' + i.toString(),
                customId: 'owner_id_00' + i.toString(),
                name: 'owner_00' + i.toString(),
                email: 'owner_email' + i.toString() + '@gmail.com',
                roleId: 3,
            })),
    })
    await prisma.user.createMany({
        data: Array(5)
            .fill(0)
            .map((v, i) => ({
                id: 'user' + i.toString(),
                customId: 'user_id_00' + i.toString(),
                name: 'user_00' + i.toString(),
                email: 'user_email' + i.toString() + '@gmail.com',
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

const projectsOnRoles = async () => {
    await prisma.projectsOnRoles.createMany({
        data: [
            {
                roleId: 3,
                projectId: 1,
            },
            {
                roleId: 3,
                projectId: 2,
            },
            {
                roleId: 3,
                projectId: 3,
            },
            {
                roleId: 3,
                projectId: 4,
            },
            {
                roleId: 3,
                projectId: 5,
            },
        ],
    })

    await prisma.projectsOnRoles.createMany({
        data: [
            {
                roleId: 2,
                projectId: 6,
            },
            {
                roleId: 2,
                projectId: 7,
            },
            {
                roleId: 2,
                projectId: 8,
            },
            {
                roleId: 2,
                projectId: 9,
            },
            {
                roleId: 2,
                projectId: 10,
            },
        ],
    })
}

const categoriesOnRoles = async () => {
    await prisma.categoriesOnRoles.createMany({
        data: [
            {
                roleId: 3,
                categoryId: 1,
            },
            {
                roleId: 3,
                categoryId: 2,
            },
            {
                roleId: 3,
                categoryId: 3,
            },
            {
                roleId: 3,
                categoryId: 4,
            },
            {
                roleId: 3,
                categoryId: 5,
            },
        ],
    })

    await prisma.categoriesOnRoles.createMany({
        data: [
            {
                roleId: 2,
                categoryId: 6,
            },
            {
                roleId: 2,
                categoryId: 7,
            },
            {
                roleId: 2,
                categoryId: 8,
            },
            {
                roleId: 2,
                categoryId: 9,
            },
            {
                roleId: 2,
                categoryId: 10,
            },
        ],
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
            data: Array(5)
                .fill(0)
                .map((v, i) => ({
                    summary: '作業1-' + i.toString(),
                    note: '補足1-' + i.toString(),
                    date,
                    hours: 0.25 * (i + 1),
                    categoryId: i + 1,
                    projectId: i + 1,
                    userId: 'owner1',
                })),
        })
        await prisma.task.createMany({
            data: Array(5)
                .fill(0)
                .map((v, i) => ({
                    summary: '作業2-' + i.toString(),
                    note: '補足2-' + i.toString(),
                    date,
                    hours: 0.25 * (i + 1),
                    categoryId: i + 1,
                    projectId: i + 1,
                    userId: 'owner1',
                })),
        })
    })

    dateList.forEach(async (date) => {
        await prisma.task.createMany({
            data: Array(5)
                .fill(0)
                .map((v, i) => ({
                    summary: '作業1-' + i.toString(),
                    note: '補足1-' + i.toString(),
                    date,
                    hours: 0.25 * (i + 1),
                    categoryId: i + 1,
                    projectId: i + 1,
                    userId: 'user1',
                })),
        })
        await prisma.task.createMany({
            data: Array(5)
                .fill(0)
                .map((v, i) => ({
                    summary: '作業2-' + i.toString(),
                    note: '補足2-' + i.toString(),
                    date,
                    hours: 0.25 * (i + 1),
                    categoryId: i + 6,
                    projectId: i + 6,
                    userId: 'user1',
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
