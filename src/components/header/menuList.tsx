import React from 'react'
import { MenuItem } from '@material-ui/core'
import Link from 'next/link'
import Image from 'next/image'
import Modal from '../Modal'
import { signIn, signOut, useSession } from 'next-auth/client'

const MenuList = React.memo(() => {
    const [session]: any = useSession()
    const [isOpenModal, toggleModal] = React.useState(null)

    const handleModalOpen = (e) => {
        toggleModal(e.currentTarget)
    }
    const handleModalClose = () => {
        toggleModal(null)
    }
    const handleSignin = (event) => {
        event.preventDefault()
        signIn()
    }
    const handleSignout = (event) => {
        event.preventDefault()
        signOut({
            callbackUrl: 'http://localhost:3000/signin',
        })
    }

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
                            <Link href={`/${session?.user?.customId}`}>
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
                            <div onClick={handleSignin}>ログイン</div>
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
})

MenuList.displayName = 'MenuList'

export default MenuList
