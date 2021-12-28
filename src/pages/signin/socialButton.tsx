import React from 'react'
import { signIn } from 'next-auth/client'

type IProps = {
    id: string
    name: string
    theme: string
    hover: string
}

const SocialButton = (props: IProps): React.ReactElement => {
    return (
        <button
            className={`${props.theme} hover:${props.hover} text-white font-bold py-2 px-4 my-2 rounded`}
            onClick={() => {
                signIn(props.id)
            }}
        >
            {props.name} アカウントでログイン
        </button>
    )
}

export default SocialButton
