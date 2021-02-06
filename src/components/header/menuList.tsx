import React from 'react'
import { MenuItem } from '@material-ui/core'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Modal from '../Modal'
import { signIn, signOut, useSession } from 'next-auth/client'

const MenuList = (): React.ReactElement => {
    const [session] = useSession()
    const [isOpenModal, toggleModal] = React.useState(null)
    const router = useRouter()

    const handleModalOpen = (e) => {
        toggleModal(e.currentTarget)
    }
    const handleModalClose = () => {
        toggleModal(null)
    }
    const handleSignout = React.useCallback(async () => {
        await signOut()
        router.push('/')
    }, [])

    return (
        <>
            <Image
                src={session?.user?.image || '/avatar.png'}
                alt="アバター画像"
                width={50}
                height={50}
                className="rounded-full"
                onClick={handleModalOpen}
            />
            <Modal isOpenModal={isOpenModal} toggleModal={toggleModal}>
                {session?.user ? (
                    // NOTE: Material-uiのコンポーネント内でfragmentを使うとエラーになる
                    <div>
                        <MenuItem onClick={handleModalClose}>
                            <Link href={`/${session.user.customId}`}>
                                <a>マイページ</a>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleModalClose}>
                            <a onClick={handleSignout}>ログアウト</a>
                        </MenuItem>
                    </div>
                ) : (
                    <div>
                        <MenuItem onClick={handleModalClose}>
                            <div
                                onClick={(e) => {
                                    e.preventDefault()
                                    signIn()
                                }}
                            >
                                ログイン
                            </div>
                        </MenuItem>
                        <MenuItem onClick={handleModalClose}>
                            <Link href="/signup">
                                <a>ユーザー登録</a>
                            </Link>
                        </MenuItem>
                    </div>
                )}
            </Modal>
        </>
    )
}

export default MenuList
