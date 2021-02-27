import React from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from './drawer'
import MenuList from './menuList'
import Link from 'next/link'
import MediaQuery from 'react-responsive'
import HEADER_ITEMS from './items'
import HeaderItem from './headerItem'

const Header = (): React.ReactElement => {
    const [isOpenDrawer, setIsOpenDrawer] = React.useState(false)
    const handleDrawer = () => {
        if (!isOpenDrawer) {
            setIsOpenDrawer(true)
        } else {
            setIsOpenDrawer(false)
        }
    }

    return (
        <>
            <div className="shadow-lg h-20 flex items-center">
                <MediaQuery query="(max-width: 900px)">
                    <MenuIcon
                        className="ml-8"
                        onClick={handleDrawer}
                        fontSize="large"
                    />
                    <Drawer
                        isOpenDrawer={isOpenDrawer}
                        handleClose={handleDrawer}
                    />
                    <span className="mx-3 font-black text-xl">
                        <Link href="/">
                            <a>日報ツール</a>
                        </Link>
                    </span>
                </MediaQuery>
                <MediaQuery query="(min-width: 900px)">
                    <span className="ml-8 font-black text-xl">
                        <Link href="/">
                            <a>日報ツール</a>
                        </Link>
                    </span>
                    {HEADER_ITEMS.map((item) => (
                        <HeaderItem
                            url={item.url}
                            name={item.name}
                            key={item.name}
                        />
                    ))}
                </MediaQuery>
                <p className="ml-auto mr-8">
                    <MenuList />
                </p>
            </div>
        </>
    )
}

export default Header
