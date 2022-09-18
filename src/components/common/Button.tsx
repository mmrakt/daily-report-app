import React from 'react'

type Color = 'primary' | 'secondary' | 'tertiary'

type IProps = {
    text: string
    color: Color
    type?: 'button' | 'submit' | 'reset'
    onClickEvent?: (
        event:
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
            | React.FormEvent<HTMLFormElement>
    ) => Promise<void> | void
    className?: string
    disabled?: boolean
}
const Button = (props: IProps): React.ReactElement => {
    let colorStyle = ''
    switch (props.color) {
        case 'primary':
            colorStyle = 'bg-blue-400 hover:bg-blue-500 focus:ring-blue-200'
            break
        case 'secondary':
            colorStyle = 'bg-red-400 hover:bg-red-500 focus:ring-red-200'
            break
        case 'tertiary':
            colorStyle = 'bg-gray-400 hover:bg-gray-500 focus:ring-gray-200'
            break
    }
    return (
        <button
            className={`${props.className} ${colorStyle} focus:ring-2 text-white font-bold py-2 px-4 my-2 rounded`}
            onClick={props.onClickEvent}
            type={props.type}
            disabled={props.disabled ? true : false}
        >
            {props.text}
        </button>
    )
}

export default Button
