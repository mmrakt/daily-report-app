import { PrismaAdapter } from '@next-auth/prisma-adapter'
import dotenv from 'dotenv'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaClient } from '@/libs/prisma'

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
})

const prisma = new PrismaClient()

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    secret: 'secret',
    // callbacks: {
    //     async session({ session, user, token }) {
    //         session.user.id = user.id
    //         session.user.profile = user.profile as string
    //         return Promise.resolve(session)
    //     },
    // },
})
