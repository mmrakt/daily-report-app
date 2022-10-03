import React from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../libs/theme'
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
                <ThemeProvider theme={theme}>
                    <CssBaseline />

                    <SessionProvider session={pageProps.session}>
                        <NextNprogress />
                        <Component {...pageProps} />
                    </SessionProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </>
    )
}

export default App
