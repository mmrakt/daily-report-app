import React from 'react'
import {} from '@material-ui/core'
import { Menu, MenuItem } from '@material-ui/core'

type IProps = {
    isOpenModal: Element
    toggleModal: (boolean) => void
    children: React.ReactNode
}

const MenuList = (props: IProps): React.ReactElement => {
    const { isOpenModal, toggleModal, children } = props

    const handleModalClose = () => {
        toggleModal(null)
    }

    return (
        <>
            <Menu
                id="simple-menu"
                anchorEl={isOpenModal}
                keepMounted
                open={Boolean(isOpenModal)}
                onClose={handleModalClose}
            >
                {children}
            </Menu>
        </>
    )
}

export default MenuList
