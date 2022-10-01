import React from 'react'
import Tab from './Tab'
import { useRouter } from 'next/router'
import { TAB_ITEMS } from '../../../consts/index'
import { useFetchPrivilege } from '@/hooks/role/useFetchPrivilege'
import Title from './Title'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { signOut } from 'next-auth/react'
import { Role } from '@prisma/client'

const SignedInHeader: React.FC<{ userId: string }> = ({ userId }) => {
    const { data: role, isLoading } = useFetchPrivilege(userId)
    if (isLoading) return <LoadingSpinner />

    return <Header role={role} />
}

const Header: React.FC<{ role?: Pick<Role, 'privilege'> }> = ({ role }) => {
    const [isSelectedTab, setSelectedTab] = React.useState<string>('')
    const router = useRouter()

    React.useEffect(() => {
        setSelectedTab(router.asPath)
    }, [router])

    return (
        <>
            <header className="shadow-lg h-20 flex items-center">
                <Title />
                {role && role.privilege === 'admin' && (
                    <>
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
                    </>
                )}
                {role && (
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
                )}
            </header>
        </>
    )
}

export { SignedInHeader, Header }
