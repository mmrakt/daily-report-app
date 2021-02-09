import React from 'react'
import {} from '@material-ui/core'
import Layout from '../../components/layout'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/client'
import ProtectedRoute from '../../auth/ProtectedRoute'

const Mypage = (): React.ReactElement => {
    const [session] = useSession()

    return (
        <ProtectedRoute>
            {session?.user && (
                <Layout title="マイページ">
                    <div className="flex my-8 space-x-4 mx-auto itmes-center">
                        <div>
                            <Image
                                className="shadow-inner rounded-full"
                                src={session.user.image || '/avatar.png'}
                                alt="アバター"
                                width={150}
                                height={150}
                            />
                        </div>
                        <div>
                            <h1 className="leading-tight font-semibold text-3xl my-2 mx-2">
                                {session.user.name}
                            </h1>
                            <p className="text-grey-500 my-2 mx-2">
                                @{session.user.customId}
                            </p>
                            <p className="w-60 break-words my-2 mx-2">
                                {session.user.profile}
                            </p>
                        </div>
                        <Link href="/settings">
                            <a className="underline">プロフィール設定</a>
                        </Link>
                    </div>
                    <ul>
                        <li>
                            メールアドレスの変更は
                            <Link href="/account/reset_email">
                                <a className="underline">こちら</a>
                            </Link>
                        </li>
                        <li>
                            アカウントの削除は
                            <Link href="/account/delete">
                                <a className="underline">こちら</a>
                            </Link>
                        </li>
                    </ul>
                </Layout>
            )}
        </ProtectedRoute>
    )
}
export default Mypage
