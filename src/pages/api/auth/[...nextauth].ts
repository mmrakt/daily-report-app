import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import adapters from 'next-auth/adapters'
import prisma from '../../../lib/prisma'
import { NextApiRequest } from 'next'
import { NextApiResponse } from 'next-auth/_utils'

const options = {
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_secret,
        }),
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        Providers.Twitter({
            clientId: process.env.TWITTER_ID,
            clientSecret: process.env.TWITTER_SECRET,
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
    session: {
        jwt: true,
    },
    adapter: adapters.Prisma.Adapter({ prisma }),
    callbacks: {
        jwt: async (token, user, account) => {
            if (user) {
                token.user = account
            }
            return Promise.resolve(token)
        },
        //TODO: 型定義ちゃんとやる。デフォルトの型を交差型でオーバーライド必要
        //node_modules/@types/next-auth/_utils.d.tsのSessionBaseのコメントアウト外す
        session: async (session: any, user: any) => {
            session.user.name = user.name
            session.user.profile = user.profile
            if (user.user.provider === 'twitter') {
                session.user.customId = user.user.results.screen_name
            }
            return Promise.resolve(session)
        },
    },
    //database: process.env.DATABASE_URL,
    debug: true,
}

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
    NextAuth(req, res, options)
