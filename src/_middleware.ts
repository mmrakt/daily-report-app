import { withAuth } from 'next-auth/middleware'

export default withAuth(
    function middleware(req) {
        console.log(req.nextauth.token)
    },
    {
        callbacks: {
            authorized({ req, token }) {
                if (token) return true
            },
        },
    }
)

export const config = { matcher: ['/', '/assignment', 'classification'] }
