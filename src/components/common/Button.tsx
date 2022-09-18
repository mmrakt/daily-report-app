import React from 'react'

type IProps = {
    text: string
    type?: 'button' | 'submit' | 'reset'
    onClickEvent?: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => Promise<void> | void
    className?: string
    disabledButton?: boolean
}
const Button = (props: IProps): React.ReactElement => {
    return (
        <button
            className={`${props.className} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded`}
            onClick={props.onClickEvent}
            type={props.type}
            disabled={props.disabledButton ? true : false}
        >
            {props.text}
        </button>
    )
}

export default Button
