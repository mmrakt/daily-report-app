import React from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../components/theme'
import { Provider } from 'react-redux'
import store from '../store/store'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import 'minireset.css'
import '../base.css'
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.css'
//import { AuthProvider } from '../auth/AuthProvider'
import { AppProps } from 'next/app'
import '../../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider as NextAuthProvider } from 'next-auth/client'
import NextNprogress from 'nextjs-progressbar'

export const AuthContext = React.createContext(null)

const queryClient = new QueryClient()

// NOTE: functionでなくconstにすると下記エラーとなる
// The default export is not a React Component
export default function MyApp(props: AppProps): React.ReactElement {
    const { Component, pageProps } = props

    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles)
        }
    }, [])

    const client = new ApolloClient({
        uri: 'http://localhost:8080/v1/graphql',
        cache: new InMemoryCache(),
    })

    return (
        <>
            <Head>
                <title>日報つーる</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <QueryClientProvider client={queryClient}>
                        <ThemeProvider theme={theme}>
                            <CssBaseline />

                            <NextAuthProvider session={pageProps.session}>
                                <NextNprogress />
                                <Component {...pageProps} />
                            </NextAuthProvider>
                        </ThemeProvider>
                    </QueryClientProvider>
                </Provider>
            </ApolloProvider>
        </>
    )
}
