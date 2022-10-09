import React from 'react'
import Tab from './Tab'
import { useRouter } from 'next/router'
import { TAB_ITEMS } from '../../../consts/index'
import Title from './Title'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

const Header: React.FC<{ isPermitted: boolean }> = ({ isPermitted }) => {
    const [isSelectedTab, setSelectedTab] = React.useState<string>('')
    const router = useRouter()
    const { data, status } = useSession()

    React.useEffect(() => {
        setSelectedTab(router.asPath)
    }, [router])

    return (
        <>
            <header className="shadow-lg h-20 flex items-center">
                <Title />
                {isPermitted && (
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
                {status === 'loading' ? (
                    <LoadingSpinner />
                ) : status === 'authenticated' ? (
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
                ) : (
                    <></>
                )}
            </header>
        </>
    )
}

export default Header
