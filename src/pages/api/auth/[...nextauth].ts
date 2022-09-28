import { PrismaAdapter } from '@next-auth/prisma-adapter'
import dotenv from 'dotenv'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import prisma from '@/libs/prisma'

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
})

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    secret: 'secret',
    callbacks: {
        async session({ session, user }) {
            session.user.id = user.id
            return Promise.resolve(session)
        },
    },
})
