import React, { useState, useRef } from 'react'
import {} from '@material-ui/core'
import Button from '../../components/Button'
import { useMutation, useQueryClient } from 'react-query'
//import {AuthContext} from '../../auth/AuthProvider'

const TweetForm = (): React.ReactElement => {
    //const { signinAccount } = React.useContext(AuthContext)
    const [content, setContent] = useState<string>('')
    const queryClient = useQueryClient()
    const inputRef = useRef(null)

    const { mutate } = useMutation(
        () => {
            return fetch('/api/tweet/create', {
                method: 'POST',
                body: content,
            })
        },
        {
            onSuccess: () => {
                //クエリのキャッシュの無効化
                queryClient.invalidateQueries('tweetList')
            },
        }
    )

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
