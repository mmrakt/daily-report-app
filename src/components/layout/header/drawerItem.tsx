import React from 'react'
import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import Link from 'next/link'

type IProps = {
    href: string
    icon: React.ReactElement
    listItemText: string
}
const DrawerItem = (props: IProps): React.ReactElement => {
    const { href, icon, listItemText } = props
    return (
        <Link href={href}>
            <ListItem button>
                <ListItemAvatar>{icon}</ListItemAvatar>
                <ListItemText>{listItemText}</ListItemText>
            </ListItem>
        </Link>
    )
}
export default DrawerItem
