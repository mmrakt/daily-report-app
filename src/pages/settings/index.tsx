import React, { useState } from 'react'
import {} from '@material-ui/core'
import Layout from '../../components/layout'
import { CssBaseline, Grid, makeStyles, Container } from '@material-ui/core'
import 'react-image-crop/dist/ReactCrop.css'
import AvatalTrimmingModal from './AvatarTrimmingModal'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import TextFieldEl from '../../components/grid/textFieldEl'
import { vldRules } from '@/utils/validationRule'
import ProtectedRoute from '../../auth/ProtectedRoute'
import Button from '../../components/Button'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { useQueryClient } from 'react-query'
import { useMutate } from '../../hooks/useMutate'

const AvatarImg = styled.img`
    border-radius: 50%;
    height: 100px;
    width: 100px;
`

const useStyles = makeStyles((theme) => ({
    paper: {},
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

const Settings = (): React.ReactElement => {
    const classes = useStyles()
    const [session] = useSession()
    const queryClient = useQueryClient()
    const [editedUserName, setEditedUserName] = useState('')
    const [editedProfile, setEditedProfile] = useState('')
    const [src, setSrc] = useState<any>(null)
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const { register, errors } = useForm({
        criteriaMode: 'all',
        mode: 'onChange',
    })
    const router = useRouter()

    React.useEffect(() => {
        setEditedUserName(session?.user?.name)
        setEditedProfile(session?.user?.profile)
    }, [session])

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader()
            reader.addEventListener('load', () => {
                setSrc(reader.result)
                setModalIsOpen(true)
            })
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleUpdateUserNameAndProfile = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): Promise<void> => {
        event.preventDefault()

        try {
            await mutate()
            await updateUserNameAndProfileOnLocalStorage()
        } catch (error) {
            console.log(error)
        }

        router.push(`/${session.user.customId}`)
    }
    const { mutate } = useMutate({
        path: `/api/user/updateProfile/?customId=${session.user.customId}`,
        method: 'POST',
        body: JSON.stringify({
            userName: editedUserName,
            profile: editedProfile,
        }),
        key: 'userList',
    })

    const updateUserNameAndProfileOnLocalStorage = () => {
        localStorage.setItem(
            'signinUser',
            JSON.stringify({
                userName: editedUserName,
                profile: editedProfile,
            })
        )
    }
    return (
        <ProtectedRoute>
            <Layout title="アカウント設定">
                {session?.user && (
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <AvatarImg
                                src={
                                    session?.user?.image
                                        ? session.user.image
                                        : 'avatar.png'
                                }
                            />
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={onSelectFile}
                                />
                            </div>
                            <AvatalTrimmingModal
                                modalIsOpen={modalIsOpen}
                                onRequestClose={() => setModalIsOpen(false)}
                                src={src}
                            />
                            <form className={classes.form} noValidate>
                                <Grid container spacing={2}>
                                    <TextFieldEl
                                        id="userName"
                                        label="ユーザー名"
                                        name="diplayName"
                                        autoComplete="userName"
                                        type="text"
                                        value={editedUserName || ''}
                                        onChange={(
                                            e: React.FocusEvent<HTMLInputElement>
                                        ) => {
                                            setEditedUserName(e.target.value)
                                        }}
                                        inputRef={register({
                                            maxLength:
                                                vldRules.checkMaxLength20,
                                        })}
                                        error={Boolean(errors.newEmail)}
                                        errors={errors}
                                    />
                                    <TextFieldEl
                                        id="profile"
                                        label="プロフィール文"
                                        name="profile"
                                        autoComplete="profile"
                                        type="text"
                                        value={editedProfile || ''}
                                        multiline
                                        rows={4}
                                        onChange={(
                                            e: React.FocusEvent<HTMLInputElement>
                                        ) => {
                                            setEditedProfile(e.target.value)
                                        }}
                                        inputRef={register({
                                            maxLength:
                                                vldRules.checkMaxLength100,
                                        })}
                                        error={Boolean(errors.newEmail)}
                                        errors={errors}
                                    />
                                </Grid>
                                <Button
                                    text="更新"
                                    onClickEvent={
                                        handleUpdateUserNameAndProfile
                                    }
                                />
                            </form>
                        </div>
                    </Container>
                )}
            </Layout>
        </ProtectedRoute>
    )
}
export default Settings
