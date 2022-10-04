import React from 'react'
import { signIn } from 'next-auth/react'
import Button from '@/components/common/Button'
import Header from '@/components/layout/header'
import Main from '../../components/layout/Main'
import hasSession from '@/utils/hasSession'
import { GetServerSidePropsContext } from 'next'

const SignIn: React.FC = () => {
    return (
        <>
            <Header isPermitted={false} />
            <Main>
                <div className="flex items-center justify-center">
                    <Button
                        text="Googleアカウントでログイン"
                        color="secondary"
                        className="font-bold py-2 px-4 my-2 rounded"
                        onClickEvent={() => {
                            signIn('google', { callbackUrl: '/' })
                        }}
                    />
                </div>
            </Main>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await hasSession(context)
    if (session) {
        return {
            redirect: {
                permanent: false,
                destination: '/',
            },
        }
    }
    return { props: {} }
}

export default SignIn
