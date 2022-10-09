import Document, {
    DocumentContext,
    Html,
    Head,
    Main,
    NextScript,
} from 'next/document'
import React from 'react'
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components'

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<any> {
        const styledComponentSheets = new StyledComponentSheets()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        styledComponentSheets.collectStyles(<App {...props} />),
                })

            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {styledComponentSheets.getStyleElement()}
                    </>
                ),
            }
        } finally {
            styledComponentSheets.seal()
        }
    }

    render(): any {
        return (
            <Html lang="ja">
                <Head />
                <body className="bg-gray-100">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
