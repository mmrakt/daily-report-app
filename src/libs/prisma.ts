import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({
    log: ['error', 'warn', 'info', 'query'],
})
export default prisma

export * from '@prisma/client'
