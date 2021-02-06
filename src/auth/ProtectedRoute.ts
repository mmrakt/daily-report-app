import React from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from './AuthProvider'

type IProps = {
    children: React.ReactElement
}

const ProtectedRoute: React.FC<IProps> = (props) => {
    const { children } = props
    //const { signinAccount } = React.useContext(AuthContext)

    //TODO: signinAccountを取得する前にリダイレクトされてしまうので解消する
    // if (!signinAccount) {
    //     if (typeof window !== 'undefined') {
    //         useRouter().push('/signin')
    //     }
    // }
    return children
}

export default ProtectedRoute
