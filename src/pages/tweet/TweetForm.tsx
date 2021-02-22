import React, { useState, useRef } from 'react'
import {} from '@material-ui/core'
import Button from '../../components/Button'
import { useMutate } from '../../hooks/useMutate'
import { useSession } from 'next-auth/client'

const TweetForm = (): React.ReactElement => {
    const [content, setContent] = useState<string>('')
    const inputRef = useRef(null)
    const [session] = useSession()

    const { mutate } = useMutate({
        path: '/api/tweet/create',
        method: 'POST',
        body: JSON.stringify({
            customId: session.user.customId,
            content,
        }),
        key: 'tweetList',
    })

    const onTweet = (event) => {
        event.preventDefault()
        mutate()
        inputRef.current.value = ''
        setContent('')
    }

    return (
        <div className="border-solid border-2 py-4 px-4">
            <textarea
                className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="今なにしてる？"
                onChange={(event) => setContent(event.target.value)}
                ref={inputRef}
            ></textarea>
            <Button
                className={
                    content === ''
                        ? 'disabled:opacity-50 float-right'
                        : 'float-right'
                }
                text="つぶやく"
                onClickEvent={(event) => onTweet(event)}
                disabledButton={content === '' ? true : false}
            />
            <p className="clear-right"></p>
        </div>
    )
}
export default TweetForm
