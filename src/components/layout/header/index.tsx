import React from 'react'
import Link from 'next/link'
import Tab from './Tab'
import { useRouter } from 'next/router'
import { TAB_ITEMS } from '../../../consts/index'
import { useFetchPrivilege } from '@/hooks/role/useFetchPrivilege'
import { useSession, signOut } from 'next-auth/react'

const Header = React.memo(() => {
    const [isSelectedTab, setSelectedTab] = React.useState<string>('')
    const router = useRouter()

    const privilege = useFetchPrivilege()

    React.useEffect(() => {
        setSelectedTab(router.asPath)
    }, [router])

    return (
        <>
            <div className="shadow-lg h-20 flex">
                <p className="px-8 py-8 font-black text-xl">
                    <Link href="/">
                        <a>日報ツール</a>
                    </Link>
                </p>
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
                <button
                    className="class"
                    onClick={() => {
                        signOut({ callbackUrl: '/signin' })
                    }}
                >
                    サインアウト
                </button>
            </div>
        </>
    )
})

Header.displayName = 'Header'

export default Header
