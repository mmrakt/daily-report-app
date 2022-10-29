import React from 'react'
import Link from 'next/link'

type IProps = {
    url: string
    name: string
    textColor: string
}

const Tab = (props: IProps): React.ReactElement => {
    return (
        <Link href={props.url}>
            <span
                className={`px-4 py-8 font-medium text-base hover:text-black ${props.textColor}`}
            >
                {props.name}
            </span>
        </Link>
    )
}

export default Tab
