import React from 'react'
import { providers, signIn } from 'next-auth/client'
import Layout from '../../components/layout'

type IProviders = {
    provider: {
        id: string
        name: string
    }
}
const SignIn = ({ providers }: { providers: IProviders }): React.ReactNode => {
    return (
        <>
            <Layout title="ログイン">
                {Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                        <button onClick={() => signIn(provider.id)}>
                            Sign in with {provider.name}
                        </button>
                    </div>
                ))}
            </Layout>
        </>
    )
}

export async function getStaticProps(context) {
    return {
        props: {
            providers: await providers(context),
        },
    }
}

export default SignIn
