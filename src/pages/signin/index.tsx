import React from 'react'
import Layout from '../../components/layout'
import { signIn } from 'next-auth/react'
import Button from '@/components/common/Button'

const SignIn = () => {
    return (
        <>
            <Layout>
                <div>
                    <Button
                        text="Googleアカウントでログイン"
                        color="secondary"
                        className="font-bold py-2 px-4 my-2 rounded"
                        onClickEvent={() => {
                            signIn('google', { callbackUrl: '/' })
                        }}
                    />
                </div>
            </Layout>
        </>
    )
}

export default SignIn
