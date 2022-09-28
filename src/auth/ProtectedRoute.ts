import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

type IProps = {
    children: React.ReactNode
}

//TODO: anyをなんとかする
const ProtectedRoute: any = (props: IProps) => {
    const { children } = props
    const router = useRouter()
    const [session] = useSession()

    if (!session) {
        if (typeof window !== 'undefined' && session !== undefined) {
            router.push('/signin')
            return null
        }
        return `<div>loading...</div>`
    }

    return children
}

export default ProtectedRoute
