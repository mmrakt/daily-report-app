import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { GetServerSidePropsContext } from 'next'
import { unstable_getServerSession } from 'next-auth'
const hasSession = async (context: GetServerSidePropsContext) => {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
    )
    return session
}

export default hasSession
