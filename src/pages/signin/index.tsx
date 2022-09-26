import React from 'react'
import Layout from '../../components/layout'
import { signIn } from 'next-auth/react'

const SignIn = () => {
    return (
        <>
            <Layout>
                <div>
                    <button
                        className="font-bold py-2 px-4 my-2 rounded"
                        onClick={() => {
                            signIn('google')
                        }}
                    >
                        Googleアカウントでログイン
                    </button>
                </div>
            </Layout>
        </>
    )
}

export default SignIn
