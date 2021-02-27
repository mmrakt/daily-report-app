import React from 'react'
import Link from 'next/link'

type IProps = {
    url: string
    name: string
}

const HeaderItem = (props: IProps): React.ReactElement => {
    return (
        <span className="ml-5 font-medium text-base">
            <Link href={props.url}>
                <a>{props.name}</a>
            </Link>
        </span>
    )
}

export default HeaderItem
