import { PrismaAdapter } from '@next-auth/prisma-adapter'
import dotenv from 'dotenv'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import prisma from '@/libs/prisma'

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
})

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    secret: 'M5hlTSu5sDBFOhe9o7uTrLEXMHNHTaEPS9XbzUPgfDg=',
    callbacks: {
        async session({ session, user }) {
            session.user.id = user.id
            const dbUser = await prisma.user.findFirst({
                where: {
                    id: {
                        equals: user.id,
                    },
                },
                select: {
                    roleId: true,
                },
            })
            session.user.roleId = dbUser.roleId
            return Promise.resolve(session)
        },
    },
}

export default NextAuth(authOptions)
