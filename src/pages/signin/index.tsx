import React from 'react'
import { signIn } from 'next-auth/react'
import Button from '@/components/common/Button'
import NotSidnedInHeader from '@/components/layout/header/NotSignedInHeader'
import Main from '../../components/layout/Main'

const SignIn: React.FC = () => {
    return (
        <>
            <NotSidnedInHeader />
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
