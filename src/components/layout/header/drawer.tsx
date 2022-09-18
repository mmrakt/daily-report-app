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
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import DrawerItem from './drawerItem'
import HEADER_ITEMS from './items'

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
                    {HEADER_ITEMS.map((item, index) => (
                        <DrawerItem
                            key={index}
                            href={item.url}
                            icon={item.icon}
                            listItemText={item.name}
                        />
                    ))}
                </List>
            </DrawerEl>
        </>
    )
}

export default Drawer
