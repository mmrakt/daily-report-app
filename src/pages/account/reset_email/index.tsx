import React, { useState } from 'react'
import Layout from '../../../components/layout'
import { firebase, fbAuth, fbDb } from 'functions/firebase'
import { CssBaseline, Grid, Container } from '@material-ui/core'
import TextFieldEl from '../../../components/grid/textFieldEl'
import { useForm } from 'react-hook-form'
import { vldRules } from '../../../utils/validationRule'
import ProtectedRoute from '../../../auth/ProtectedRoute'
import Button from '../../../components/Button'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

const ResetEmail = (): React.ReactElement => {
    const [session] = useSession()
    const router = useRouter()
    const [newEmail, setNewEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const { register, errors } = useForm({
        mode: 'onChange',
        criteriaMode: 'all',
    })

    const onResetEmail = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault()
        try {
            console.log(event.target[0].value)
            await reauthenticateWithCredential(event.target[0].value)
            await updateAccountEmailOnFbDB()
            fbAuth.currentUser.sendEmailVerification()
            setTimeout(() => {
                router.push('/account/reset_email/complete')
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }

    const reauthenticateWithCredential = async (
        oldEmail: string
    ): Promise<void> => {
        fbAuth.currentUser
            .reauthenticateWithCredential(fetchCredential(oldEmail))
            .then(() => {
                console.log('再認証成功！')
                fbAuth.currentUser.updateEmail(newEmail)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                fbAuth.currentUser.getIdToken(true)
            })
    }
    const fetchCredential = (oldEmail: string) => {
        return firebase.auth.EmailAuthProvider.credential(oldEmail, password)
    }
    const updateAccountEmailOnFbDB = async (): Promise<void> => {
        fbDb.collection('users')
            .doc(fbAuth.currentUser.uid)
            .set(
                {
                    email: newEmail,
                },
                {
                    merge: true,
                }
            )
            .then(() => {
                console.log('メールアドレス変更完了')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <ProtectedRoute>
            {session && (
                <Layout title="メールアドレス変更">
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <form onSubmit={onResetEmail}>
                            <Grid container spacing={2}>
                                <label htmlFor="oldmail">
                                    現在のメールアドレス
                                </label>
                                <input
                                    type="text"
                                    name="oldMail"
                                    value={session.user.email || ''}
                                    disabled
                                    className="mt-1 block w-full rounded-md border-red-500 shadow-sm my-2"
                                />
                                <TextFieldEl
                                    name="newEmail"
                                    label="新しいメールアドレス"
                                    id="newEmail"
                                    autoComplete="newEmail"
                                    type="text"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setNewEmail(e.target.value)
                                    }}
                                    inputRef={register({
                                        required: vldRules.required,
                                        pattern: vldRules.checkEmail,
                                    })}
                                    error={Boolean(errors.newEmail)}
                                    errors={errors}
                                />
                                <p className="my-2">
                                    ※ご指定のメールアドレスに本人確認用メールを送信します。
                                </p>
                                <TextFieldEl
                                    name="password"
                                    label="パスワード"
                                    id="password"
                                    autoComplete="password"
                                    type="password"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setPassword(e.target.value)
                                    }}
                                    inputRef={register({
                                        required: vldRules.required,
                                    })}
                                    error={Boolean(errors.password)}
                                    errors={errors}
                                />
                                <Button text="変更する" />
                            </Grid>
                        </form>
                    </Container>
                </Layout>
            )}
        </ProtectedRoute>
    )
}
export default ResetEmail
