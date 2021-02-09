import React from 'react'
import {
    Drawer as DrawerEl,
    List,
    Divider,
    IconButton,
    Theme,
    useTheme,
    makeStyles,
    createStyles,
} from '@material-ui/core'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import MenuIcon from '@material-ui/icons/Menu'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { formatDate } from '../../utils/date'
import DrawerItem from './drawerItem'

type IProps = {
    isOpenDrawer: boolean
    handleClose: () => void
}
const drawerWidth = 300

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
    })
)
const Drawer = (props: IProps): React.ReactElement => {
    const { isOpenDrawer, handleClose } = props
    const theme = useTheme()
    const classes = useStyles()
    const drawerItemList = [
        {
            href: '/',
            icon: <MenuIcon />,
            listItemText: 'トップメニュー',
        },
        {
            href: `/submit/${formatDate(new Date())}`,
            icon: <NoteAddIcon />,
            listItemText: '日報の提出',
        },
        {
            href: '/check',
            icon: <LibraryAddCheckIcon />,
            listItemText: '提出状況確認',
        },
        {
            href: '/aggregate',
            icon: <EqualizerIcon />,
            listItemText: '集計データ確認',
        },
        {
            href: '/todo',
            icon: <AssignmentTurnedInIcon />,
            listItemText: 'ToDo管理',
        },
        {
            href: '/tweet',
            icon: <AssignmentTurnedInIcon />,
            listItemText: 'タイムライン',
        },
    ]
    return (
        <>
            <DrawerEl
                anchor="left"
                open={isOpenDrawer}
                onClose={() => {
                    handleClose
                }}
            >
                <div className={classes.drawerHeader}>
                    {/*TODO: 子コンポーネントにonClickハンドラを含めるとエラーになる対応 */}
                    <IconButton onClick={handleClose}>
                        {theme.direction === 'ltr' ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {drawerItemList.map((drawerItem, index) => (
                        <DrawerItem
                            key={index}
                            href={drawerItem.href}
                            icon={drawerItem.icon}
                            listItemText={drawerItem.listItemText}
                        />
                    ))}
                </List>
            </DrawerEl>
        </>
    )
}

export default Drawer
