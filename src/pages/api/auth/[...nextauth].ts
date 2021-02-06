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
        //NOTE: 引数の型は/node_modules/@types/next-auth/jwt.d.tsを参照
        jwt: async (token, user, account) => {
            if (user) {
                token.user = {
                    id: user.id,
                    customId: user.customId,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    profile: user.profile,
                    account: {
                        provider: account.provider,
                        screen_name: account.results.screen_name,
                    },
                }
            }
            return Promise.resolve(token)
        },
        //TODO: 型定義ちゃんとやる。デフォルトの型を交差型でオーバーライド必要
        //node_modules/@types/next-auth/_utils.d.tsのSessionBaseのコメントアウト外す
        session: async (session: any, { user }) => {
            session.user.name = user.name
            session.user.profile = user.profile
            switch (user.account.provider) {
                case 'twitter':
                    session.user.customId = user.account.screen_name
                    break
                case 'google':
                    session.user.customId = user.email.substr(
                        0,
                        user.email.indexOf('@', 0)
                    )
                    break
            }
            await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    customId: user.account.screen_name,
                },
            })

            return Promise.resolve(session)
        },
    },
    //database: process.env.DATABASE_URL,
    debug: false,
}

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
    NextAuth(req, res, options)
