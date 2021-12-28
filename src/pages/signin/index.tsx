import React from 'react'
import { providers, signIn } from 'next-auth/client'
import Layout from '../../components/layout'
import SocialButton from './socialButton'

type IProviders = {
    provider: {
        id: string
        name: string
    }
}
type IProps = {
    props: {
        providers: () => IProviders[]
    }
}
export async function getStaticProps(): Promise<IProps> {
    return {
        props: {
            providers: await providers(),
        },
    }
}

const SignIn = ({ providers }: { providers: IProviders }): React.ReactNode => {
    return (
        <>
            <Layout title="ログイン">
                {Object.values(providers).map((provider) => (
                    <div key={provider.id}>
                        <SocialButton
                            id={provider.id}
                            name={provider.name}
                            theme={
                                provider.name === 'GitHub'
                                    ? 'bg-gray-500'
                                    : provider.name === 'Google'
                                    ? 'bg-red-400'
                                    : provider.name === 'Twitter'
                                    ? 'bg-blue-500'
                                    : ''
                            }
                            hover={
                                provider.name === 'GitHub'
                                    ? 'bg-gray-600'
                                    : provider.name === 'Google'
                                    ? 'bg-red-500'
                                    : provider.name === 'Twitter'
                                    ? 'bg-blue-600'
                                    : ''
                            }
                        />
                    </div>
                ))}
            </Layout>
        </>
    )
}

export default SignIn
