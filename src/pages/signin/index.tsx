import React from 'react'
import Layout from '../../components/layout'
import { signIn } from 'next-auth/react'
import Button from '@/components/common/Button'
import NotSidnedInHeader from '@/components/layout/header/NotSignedInHeader'

const SignIn = () => {
    return (
        <>
            <Layout>
                <NotSidnedInHeader />
                <main className="max-w-screen-md mx-auto my-20">
                    <Button
                        text="Googleアカウントでログイン"
                        color="secondary"
                        className="font-bold py-2 px-4 my-2 rounded"
                        onClickEvent={() => {
                            signIn('google', { callbackUrl: '/' })
                        }}
                    />
                </main>
            </Layout>
        </>
    )
}

export default SignIn
