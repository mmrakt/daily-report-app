import React from 'react'
import Head from 'next/head'
import 'minireset.css'
import '../base.css'
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.css'
import { AppProps } from 'next/app'
import '../../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { SessionProvider } from 'next-auth/react'
import NextNprogress from 'nextjs-progressbar'
import { Session } from 'next-auth'

export const AuthContext = React.createContext(null)

const queryClient = new QueryClient()

function App({
    Component,
    pageProps,
}: AppProps<{
    session: Session
}>) {
    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles)
        }
    }, [])

    return (
        <>
            <Head>
                <title>日報つーる</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <QueryClientProvider client={queryClient}>
                <SessionProvider session={pageProps.session}>
                    <NextNprogress />
                    <Component {...pageProps} />
                </SessionProvider>
            </QueryClientProvider>
        </>
    )
}

export default App
