import React, { useState } from 'react'
import Layout from '../../components/layout'
import {
    Avatar,
    Button,
    CssBaseline,
    Link,
    Grid,
    makeStyles,
    Container,
} from '@material-ui/core'
import { fbAuth } from '../../../functions/firebase'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { vldRules } from '../../utils/validationRule'
import TextFieldEl from '../../components/grid/textFieldEl'
import { AuthContext } from '../../auth/AuthProvider'
import { useMutation } from 'react-query'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

const Signup = (): React.ReactElement => {
    const router = useRouter()
    const classes = useStyles()
    const { signinAccount } = React.useContext(AuthContext)

    const [userId, setUserId] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [orgPassword, setOrgPassword] = useState('')
    const [loading, setLoading] = useState<boolean>(true)

    const { register, handleSubmit, errors } = useForm({
        mode: 'onChange',
        criteriaMode: 'all',
    })
    const onSubmit = (data) => console.log(data)

    if (signinAccount) {
        if (typeof window !== 'undefined') {
            router.push('/')
        }
    }

    const onSignup = async (): Promise<void> => {
        setLoading(false)
        if (email && orgPassword && loading) {
            try {
                await fbAuth
                    .createUserWithEmailAndPassword(email, orgPassword)
                    .then((result) => {
                        result.user.updateProfile({
                            displayName: userName,
                        })
                    })
                await mutate()
                router.push(`/${fbAuth.currentUser.uid}`)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(true)
            }
        }
    }

    const { mutate } = useMutation(() => {
        return fetch('/api/user/create', {
            method: 'POST',
            body: JSON.stringify({
                id: userId,
                name: userName,
            }),
        })
    })

    return (
        <Layout title="ユーザー登録">
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}></Avatar>
                    <form
                        className={classes.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Grid container spacing={2}>
                            <TextFieldEl
                                id="userId"
                                label="ユーザーID"
                                name="userId"
                                autoComplete="userId"
                                type="text"
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setUserId(e.target.value)
                                }}
                                inputRef={register({
                                    required: vldRules.required,
                                    pattern: vldRules.checkAlphanumeric,
                                })}
                                error={Boolean(errors.userId)}
                                errors={errors}
                            />
                            <TextFieldEl
                                id="userName"
                                label="ユーザー名"
                                name="userName"
                                autoComplete="userName"
                                type="text"
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setUserName(e.target.value)
                                }}
                                inputRef={register({
                                    required: vldRules.required,
                                })}
                                error={Boolean(errors.userName)}
                                errors={errors}
                            />
                            <TextFieldEl
                                id="email"
                                label="Eメールアドレス"
                                name="email"
                                autoComplete="email"
                                type="text"
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setEmail(e.target.value)
                                }}
                                inputRef={register({
                                    required: vldRules.required,
                                    pattern: vldRules.checkEmail,
                                })}
                                error={Boolean(errors.email)}
                                errors={errors}
                            />
                            <TextFieldEl
                                name="orgPassword"
                                label="パスワード"
                                type="password"
                                id="orgPassword"
                                autoComplete="current-password"
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setOrgPassword(e.target.value)
                                }}
                                inputRef={register({
                                    required: vldRules.required,
                                    minLength: vldRules.checkMinLength,
                                    pattern: vldRules.checkAlphanumeric,
                                })}
                                error={Boolean(errors.orgPassword)}
                                errors={errors}
                                render={({ messages }) =>
                                    messages &&
                                    Object.entries(
                                        messages
                                    ).map(([type, message]) => (
                                        <p key={type}>{message}</p>
                                    ))
                                }
                            />
                            <TextFieldEl
                                name="confirmPassword"
                                label="パスワード確認"
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-password"
                                inputRef={register({
                                    required: vldRules.required,
                                    validate: (value) =>
                                        orgPassword === value ||
                                        '確認用パスワードが一致しません。',
                                })}
                                error={Boolean(errors.confirmPassword)}
                                errors={errors}
                            />
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={onSignup}
                        >
                            登録
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    すでにアカウントをお持ちですか？ログイン
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </Layout>
    )
}

export default Signup
