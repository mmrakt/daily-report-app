import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

export default class MyDocument extends Document {
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
