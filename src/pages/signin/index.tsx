import React from 'react'
import { signIn, useSession } from 'next-auth/react'
import Button from '@/components/common/Button'
import { Header } from '@/components/layout/header'
import Main from '../../components/layout/Main'
import { useRouter } from 'next/router'
import LoadingSpinner from '@/components/common/LoadingSpinner'

const SignIn: React.FC = () => {
    const router = useRouter()
    const { data, status } = useSession()

    if (typeof window !== 'undefined') {
        if (status === 'loading') return <LoadingSpinner />
        if (status === 'authenticated') {
            router.push('/')
            return null
        }
    }
    return (
        <>
            <Header />
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

export default SignIn
