import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import adapters from 'next-auth/adapters'
import { PrismaClient } from '@prisma/client'
import prisma from '../../../lib/prisma'

const options = {
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecred: process.env.GITHUB_secret,
        }),
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        Providers.Email({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
        }),
    ],
    pages: {
        signIn: '/signin',
        error: '/error',
    },
    adapter: adapters.Prisma.Adapter({ prisma }),
    //database: process.env.DATABASE_URL,
}

export default (req, res) => NextAuth(req, res, options)
