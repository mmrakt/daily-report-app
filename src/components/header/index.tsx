import React from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from './drawer'
import MenuList from './menuList'
import Link from 'next/link'
import MediaQuery from 'react-responsive'
import HEADER_ITEMS from './items'
import HeaderItem from './headerItem'
import { useRouter } from 'next/router'

const Header = (): React.ReactElement => {
    const [isOpenDrawer, setIsOpenDrawer] = React.useState(false)
    const [isSelectedTab, setSelectedTab] = React.useState<string>('')
    const router = useRouter()

    const handleDrawer = () => {
        if (!isOpenDrawer) {
            setIsOpenDrawer(true)
        } else {
            setIsOpenDrawer(false)
        }
    }

    React.useEffect(() => {
        setSelectedTab(router.asPath)
    }, [router])

    return (
        <>
            <div className="shadow-lg h-20 flex">
                <MediaQuery query="(max-width: 900px)">
                    <MenuIcon
                        className="ml-8 py-3"
                        onClick={handleDrawer}
                        fontSize="large"
                    />
                    <Drawer
                        isOpenDrawer={isOpenDrawer}
                        handleClose={handleDrawer}
                    />
                    <span className="mx-4 py-8 font-black text-xl">
                        <Link href="/">
                            <a>日報ツール</a>
                        </Link>
                    </span>
                </MediaQuery>
                <MediaQuery query="(min-width: 900px)">
                    <span className="px-8 py-8 font-black text-xl">
                        <Link href="/">
                            <a>日報ツール</a>
                        </Link>
                    </span>
                    {HEADER_ITEMS.map((item) => (
                        <HeaderItem
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
                </MediaQuery>
                <div className="ml-auto mr-8 py-4">
                    <MenuList />
                </div>
            </div>
        </>
    )
}

export default Header
