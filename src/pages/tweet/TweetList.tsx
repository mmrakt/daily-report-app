import React from 'react'
import {} from '@material-ui/core'
import { useQuery } from 'react-query'
import { Tweet as ITweet } from '@prisma/client'
import TweetItem from './TweetItem'

const TweetList = (): React.ReactElement => {
    const { data: tweetList, isLoading } = useQuery<ITweet[]>(
        'tweetList',
        async () => {
            const res = await fetch('/api/tweet/fetchList')

            return res.json()
        }
    )

    if (isLoading) return <span>Loading...</span>

    return (
        <div className="border-solid border-2">
            {tweetList && (
                <>
                    <ul className="divide-y-2 divide-black divide-opacity-10">
                        {tweetList.map((tweet) => (
                            <TweetItem tweet={tweet} key={tweet.id} />
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}
export default TweetList
