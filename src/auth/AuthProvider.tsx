import React from 'react'
import { fbAuth, fbDb } from '../../functions/firebase'
import { useRouter } from 'next/router'

interface IAuthContext {
    signinAccount:
        | {
              userId: string
              userName: string
              email: string
              profile: string
              avatarURL: string
          }
        | null
        | undefined
    setSigninAccount: React.Dispatch<any>
}
const AuthContext = React.createContext<IAuthContext>({
    signinAccount: undefined,
    setSigninAccount: undefined,
})

type IProps = {
    children?: React.ReactNode
}

const AuthProvider = (props: IProps): React.ReactElement => {
    const [signinAccount, setSigninAccount] = React.useState(null)

    //NOTE: usersコレクションから取得し、stateとlocalstorageそれぞれにセット
    React.useEffect(() => {
        fbAuth.onAuthStateChanged((user) => {
            if (user) {
                fbDb.collection('users')
                    .doc(user.uid)
                    .get()
                    .then((doc) => {
                        if (doc.data()) {
                            setSigninAccount(doc.data())
                            localStorage.setItem(
                                'signinAccount',
                                JSON.stringify({
                                    userName: doc.data().userName,
                                    profile: doc.data().profile,
                                })
                            )
                        }
                    })
                    .then(() => {
                        console.log('succuess!')
                    })
            }
        })
    }, [])

    return (
        <AuthContext.Provider
            value={{
                signinAccount: signinAccount,
                setSigninAccount: setSigninAccount,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

// 未ログインで認証が必要な画面にアクセスした際の処理
const CheckAuthenticated = (): void => {
    const router = useRouter()
    if (typeof window !== 'undefined') {
        if (!fbAuth.currentUser) {
            router.push('/signin')
        }
    }
}

// ログイン済みでsignin/signup画面にアクセスした際の処理
const CheckUnAuthenticated = (): void => {
    const router = useRouter()
    if (typeof window !== 'undefined') {
        if (fbAuth.currentUser) {
            router.push('/')
        }
    }
}

export { AuthContext, AuthProvider, CheckAuthenticated, CheckUnAuthenticated }
