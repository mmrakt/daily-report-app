import React from 'react'
import Link from 'next/link'
import Tab from './Tab'
import { useRouter } from 'next/router'
import { TAB_ITEMS } from '../../../consts/index'
import { useFetchPrivilege } from '@/hooks/role/useFetchPrivilege'
import { useSession, signOut } from 'next-auth/react'
import { User } from '@prisma/client'
import Title from './Title'

const SignedInHeader = React.memo(() => {
    const [isSelectedTab, setSelectedTab] = React.useState<string>('')
    const router = useRouter()

    // const privilege = useFetchPrivilege()

    React.useEffect(() => {
        setSelectedTab(router.asPath)
    }, [router])

    return (
        <>
            <header className="shadow-lg h-20 flex items-center">
                <Title />
                {TAB_ITEMS.map((item) => (
                    <Tab
                        url={item.url}
                        name={item.name}
                        textColor={
                            item.url === isSelectedTab
                                ? 'text-black'
                                : 'text-gray-400'
                        }
                        key={item.name}
                    />
                ))}
                <div className="ml-auto mr-5">
                    <button
                        className="class"
                        onClick={() => {
                            signOut({ callbackUrl: '/signin' })
                        }}
                    >
                        サインアウト
                    </button>
                </div>
            </header>
        </>
    )
})

SignedInHeader.displayName = 'SignedInHeader'

export default SignedInHeader
